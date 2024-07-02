import 'dart:convert';

import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:frontend/api_calls/apis.dart';
import 'package:frontend/api_calls/constants.dart';
import 'package:frontend/components/percentage_card.dart';
import 'package:frontend/constants.dart';
import 'package:frontend/provider.dart';
import 'package:intl/intl.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:provider/provider.dart';

class UserPage extends StatefulWidget {
  var data;

  UserPage({super.key, required this.data});

  @override
  State<StatefulWidget> createState() {
    return _HomePage();
  }
}

class _HomePage extends State<UserPage> {
  String moneyFormat(number) {
    return format.format(number).toString();
  }

  var userData = {};

  var format = NumberFormat.currency(locale: 'HI', symbol: '₹ ');
  @override
  void initState() {
    super.initState();

    // initial data fetch
    Provider.of<DataProvider>(context, listen: false)
        .userDataHandler(widget.data["id"]);
  }

  int getPaidMonthsCount(var item) {
    int count = 0;

    return item["Pays"].where((i) => i["isPaid"] == true).toList().length;
  }

  int isCurrentMonthsPaid(var item) {
    var date = DateTime.now();

    var currentMonth = item["Pays"]
        .where((i) => i["month"] == date.month && i["year"] == date.year)
        .toList();

    if (currentMonth.length == 0) return -1;

    return currentMonth[0]["isPaid"] ? 1 : 0;
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<DataProvider>(
        builder: (BuildContext context, DataProvider value, Widget? child) {
      return Scaffold(
          body: RefreshIndicator(
        onRefresh: () => value.userDataHandler(widget.data["id"]),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.only(
                    left: 20, top: 50, bottom: 20, right: 20),
                color: color1,
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // ignore: prefer_interpolation_to_compose_strings
                          Text("${"Hello " + widget.data["name"]}!",
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 30,
                                fontWeight: FontWeight.bold,
                              )),
                          const Text("Have a nice day.",
                              style: TextStyle(
                                color: Colors.white,
                              )),
                        ],
                      ),
                      Text(
                          "${DateTime.now().day}/${DateTime.now().month}/${DateTime.now().year}",
                          style: mediumSizeBolder
                              .merge(const TextStyle(color: Colors.white)))
                    ]),
              ),
              Padding(
                  padding: EdgeInsets.all(10),
                  child: Align(
                      alignment: Alignment.topRight,
                      child: TextButton.icon(
                        onPressed: () {},
                        label: Text("Pull to refresh"),
                        icon: const Icon(Icons.refresh),
                      ))),
              Container(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  children: value.userData["Emis"] != null
                      ? value.userData["Emis"].map<Widget>((item) {
                          print(item);
                          var date = DateTime.parse(item["emiStartDate"]);

                          var monthsPaid = getPaidMonthsCount(item);

                          var isPaid = isCurrentMonthsPaid(item);

                          return Container(
                              margin:
                                  const EdgeInsets.only(bottom: 20.0, top: 10),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10.0),
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
                              width: MediaQuery.of(context).size.width * 0.9,
                              child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          "Emi - ${item["index"] + 1}",
                                          style: mediumSizeBolder,
                                        ),
                                        Text(moneyFormat(item["monthlyAmount"]),
                                            style: mediumSizeBolder)
                                      ],
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                            "Emi Started at ${date.day}/${date.month}/${date.year}",
                                            style: TextStyle(color: color1)),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        isPaid == -1
                                            ? Text("Your Emi is Ended !",
                                                style: TextStyle(color: color1))
                                            : isPaid == 1
                                                ? const Row(
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .center,
                                                    children: [
                                                      Icon(
                                                        Icons.check,
                                                        color: Colors.green,
                                                      ),
                                                      SizedBox(width: 10),
                                                      Text("Paid",
                                                          style: TextStyle(
                                                              color:
                                                                  Colors.green))
                                                    ],
                                                  )
                                                : Row(
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .center,
                                                    children: [
                                                      Icon(
                                                        Icons.timer_sharp,
                                                        color: Colors.red,
                                                      ),
                                                      SizedBox(width: 10),
                                                      Text("Pending",
                                                          style: TextStyle(
                                                              color:
                                                                  Colors.red))
                                                    ],
                                                  ),
                                      ],
                                    ),
                                    const SizedBox(
                                      height: 10,
                                    ),
                                    Align(
                                        alignment: Alignment.center,
                                        child: CircularPercentIndicator(
                                            progressColor: Colors.green,
                                            radius: 60.0,
                                            lineWidth: 8.0,
                                            percent:
                                                monthsPaid / item["loanTenure"],
                                            animation: true,
                                            animationDuration: 2000,
                                            center: Column(
                                                mainAxisAlignment:
                                                    MainAxisAlignment.center,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Text("Months Paid",
                                                      style: smallSizeBolder),
                                                  Text(
                                                      "${monthsPaid.toString()}/${item["loanTenure"].toString()}")
                                                ]))),

                                    Row(
                                      crossAxisAlignment: CrossAxisAlignment.stretch,
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        PercentageCard(
                                            const Icon(Icons.percent),
                                            "Interest \nrate",
                                            item["interestRate"].toString() +
                                                "%"),
                                        PercentageCard(
                                            Icon(Icons.money),
                                            "Principal",
                                            moneyFormat(item["principal"]).substring(0, moneyFormat(item["principal"]).length-3  )),
                                        PercentageCard(
                                            Icon(Icons
                                                .data_exploration_outlined),
                                            "Total Amount",
                                            moneyFormat(item["totalAmount"]).substring(0, moneyFormat(item["totalAmount"]).length-3  ))
                                      ],
                                    ),

                                    // ElevatedButton(
                                    //   child: const Text("View Payment History"),
                                    //   onPressed: () {},
                                    // )
                                  ]));
                        }).toList()
                      : <Widget>[],
                ),
              )
            ],
          ),
        ),
      ));
    });
  }
}
