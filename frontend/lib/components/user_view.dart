import 'dart:convert';
import 'package:expandable/expandable.dart';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:frontend/api_calls/apis.dart';
import 'package:frontend/api_calls/constants.dart';
import 'package:frontend/provider.dart';
import 'package:frontend/utils.dart';
import 'package:provider/provider.dart';
import 'package:table_calendar/table_calendar.dart';
import "../constants.dart";
import 'package:url_launcher/url_launcher.dart';
import 'package:accordion/accordion.dart';

class UserView extends StatefulWidget {
  UserView(this.userId, this.userIndex, this.toggleScreen, {super.key});

  int userId, userIndex;

  Function toggleScreen;

  @override
  State<StatefulWidget> createState() {
    return _UserView();
  }
}

class _UserView extends State<UserView> {
  @override
  Widget build(BuildContext context) {
    int index = -1;

    var time = DateTime.now();

    var month = time.month, year = time.year;

    Future updatePayment(EmiId, userId) async {
      var resp =
          await postRequest({"EmiId": EmiId}, updateUser + userId.toString());

      return resp;
    }

    return Consumer<DataProvider>(
        builder: (BuildContext context, DataProvider value, Widget? child) {
      var temp = value.fetchOneUser(widget.userId);
      var isRequesting = false;

      return FutureBuilder(
          future: temp,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              var data = jsonDecode(snapshot.data)["data"];
              return SingleChildScrollView(
                  padding: const EdgeInsets.only(
                      left: 20, top: 50, bottom: 60, right: 20),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Align(
                        alignment: AlignmentDirectional.topStart,
                        child: IconButton(
                            onPressed: () => widget.toggleScreen(),
                            icon: const Icon(Icons.arrow_back)),
                      ),
                      Column(
                        // crossAxisAlignment: CrossAxisAlignment.stretch,
                        // mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(20),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Text(data["name"].toString().toUpperCase(),
                                    style: largeSizeBolder),
                                const SizedBox(
                                  height: 15,
                                ),
                                TextButton.icon(
                                  icon: const Icon(Icons.copy),
                                  onPressed: () async {
                                    await Clipboard.setData(ClipboardData(
                                        text: data["phoneNumber"]));
                                    // copied successfully
                                  },
                                  label: Text(data["phoneNumber"]),
                                ),
                                const SizedBox(height: 15),
                                Text(data["email"]),
                                const SizedBox(height: 15),
                                TextButton.icon(
                                  icon: Icon(Icons.add),
                                  style: ButtonStyle(
                                      shape: WidgetStateProperty.all(
                                          RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(4.0),
                                      )),
                                      backgroundColor:
                                          WidgetStateProperty.all(color1),
                                      foregroundColor: WidgetStateProperty.all(
                                          Colors.white)),
                                  label: Text("Create new Emi"),
                                  onPressed: () {},
                                )
                              ],
                            ),
                          ),
                          Column(
                              children: data["Emis"].map<Widget>((item) {
                            // sort item Pays

                            item["Pays"].sort((a, b) {
                              if (a["year"] != b["year"])
                                return a["year"] < b["year"] ? 0 : 1;

                              return a["month"] < b["month"] ? 0 : 1;
                            });

                            var t = item["Pays"]
                                .where((temp) =>
                                    temp["month"] == month &&
                                    temp["year"] == year)
                                .toList();

                            var isPaid = t.length > 0 ? t[0]["isPaid"] : false;

                            var createdAt =
                                DateTime.parse(item["emiStartDate"]);

                            var createdMonth = createdAt.month;

                            var monthsLeft =
                                item["loanTenure"] - month + createdMonth;

                            index++;

                            return Container(
                                margin: const EdgeInsets.only(bottom: 20.0),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(5.0),
                                  color: Colors.white,
                                  boxShadow: const [
                                    BoxShadow(
                                      color: Colors.grey,
                                      offset: Offset(0.0, 1.0), //(x,y)
                                      blurRadius: 6.0,
                                    ),
                                  ],
                                ),
                                padding: const EdgeInsets.all(20),
                                child: Column(children: [
                                  Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        // ignore: prefer_interpolation_to_compose_strings
                                        'EMI ' +
                                            ((index % (data["Emis"].length) +
                                                    1))
                                                .toString(),
                                        style: TextStyle(color: color1)
                                            .merge(mediumSizeBolder),
                                      ),
                                      Text(
                                        monthsLeft < 0
                                            ? "${"Emi Ended " + (-monthsLeft)}back"
                                            : '${monthsLeft} months left',
                                        style: TextStyle(color: color1)
                                            .merge(mediumSizeBolder),
                                      )
                                    ],
                                  ),
                                  Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Align(
                                        alignment: Alignment.topRight,
                                        child: Text(
                                          "Created at ${createdAt.day}-${createdAt.month}-${createdAt.year}",
                                          style: const TextStyle(
                                                  color: Colors.blue)
                                              .merge(smallSizeLighter),
                                        ),
                                      ),
                                      Text(
                                        "Tenure Period : ${item["loanTenure"]} months",
                                        style: mediumSizeNormal,
                                      ),
                                      Text(
                                        "Interest rate : ${item["interestRate"]}%",
                                        style: mediumSizeNormal,
                                      ),
                                      Text(
                                        "Principal     : \u{20B9}${item["principal"]}",
                                        style: mediumSizeNormal,
                                      ),
                                      Text(
                                        "Total Amount  : \u{20B9}${item["totalAmount"]}",
                                        style: mediumSizeNormal,
                                      ),
                                      Text(
                                        "Monthly Amount: \u{20B9}${item["monthlyAmount"]}",
                                        style: mediumSizeNormal,
                                      ),
                                      const SizedBox(height: 20),
                                      ElevatedButton(
                                          onPressed: (isRequesting ||
                                                  monthsLeft < 0)
                                              ? null
                                              : () async {
                                                  var resp =
                                                      await updatePayment(
                                                    item["id"],
                                                    data["id"],
                                                  );

                                                  if (resp.statusCode == 200) {
                                                    setState(() {
                                                      true;
                                                    });
                                                    value.updateUI(
                                                        widget.userIndex,
                                                        isPaid,
                                                        item);
                                                    succesSnackbar(
                                                        context, "Success");
                                                    // update the ui
                                                  } else {
                                                    errorSnackbar(context,
                                                        "Error, Please try later!");
                                                  }
                                                },
                                          style: ButtonStyle(
                                              backgroundColor: isPaid
                                                  ? const WidgetStatePropertyAll<
                                                      Color>(Colors.red)
                                                  : const WidgetStatePropertyAll<
                                                      Color>(Colors.green),
                                              foregroundColor:
                                                  const WidgetStatePropertyAll<
                                                      Color>(Colors.white)),
                                          child: isPaid
                                              ? const Text("Update to Not-Pay")
                                              : const Text("Update to Paid")),
                                      ElevatedButton(
                                          onPressed: () => showDialog<String>(
                                              context: context,
                                              builder: (BuildContext context) =>
                                                  Center(
                                                    child:
                                                        SingleChildScrollView(
                                                            child: AlertDialog(
                                                      title: const Text(
                                                          'Month Wise Payment Details'),
                                                      content: Column(
                                                          children: item["Pays"]
                                                              .map<Widget>(
                                                                  (monthWise) {
                                                        var updatedAt = DateTime
                                                            .parse(monthWise[
                                                                "updatedAt"]);
                                                        return Row(
                                                          children: [
                                                            Text(
                                                                "${monthWise["month"]} / ${monthWise["year"]}"),
                                                            const SizedBox(
                                                              width: 40,
                                                            ),
                                                            Text(
                                                                monthWise[
                                                                        "isPaid"]
                                                                    ? "Paid at ${updatedAt.day}/${updatedAt.month}/${updatedAt.year}"
                                                                    : "Yet to pay",
                                                                style:
                                                                    mediumSizeBolder),
                                                            const SizedBox(
                                                              width: 20,
                                                            ),
                                                          ],
                                                        );
                                                      }).toList()),
                                                      actions: <Widget>[
                                                        TextButton(
                                                          onPressed: () =>
                                                              Navigator.pop(
                                                                  context,
                                                                  'Cancel'),
                                                          child: const Text(
                                                              'Go Back'),
                                                        ),
                                                      ],
                                                    )),
                                                  )),
                                          child: const Text("View Payment"))
                                    ],
                                  )
                                ]));
                          }).toList()),
                        ],
                      ),
                    ],
                  ));
            } else {
              return const Center(child: CircularProgressIndicator());
            }
          });
    });
  }
}
