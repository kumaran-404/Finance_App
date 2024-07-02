import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frontend/api_calls/constants.dart';
import 'package:frontend/constants.dart';
import 'package:frontend/components/add_user.dart';
import 'package:frontend/provider.dart';
import 'package:provider/provider.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:frontend/constants.dart';

import 'package:intl/intl.dart';

class HomeMain extends StatefulWidget {
  Function loggingOut;

  Function changePage;

  HomeMain(this.loggingOut, this.changePage, {super.key});

  @override
  State<StatefulWidget> createState() {
    return _HomeMain();
  }
}

// Colors.white12
class _HomeMain extends State<HomeMain> {
  var format = NumberFormat.currency(locale: 'HI', symbol: '₹ ');

  @override
  Widget build(BuildContext context) {
    return Consumer<DataProvider>(
        builder: (BuildContext context, DataProvider value, Widget? child) {
      return Scaffold(
          backgroundColor: const Color(0xFF3F51B5),
          body: SingleChildScrollView(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                Padding(
                    padding: const EdgeInsets.only(
                        left: 20, top: 50, bottom: 20, right: 20),
                    child: Container(
                      height: 70,
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Hello Bala!",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 30,
                                      fontWeight: FontWeight.bold,
                                    )),
                                Text("Have a nice day.",
                                    style: TextStyle(
                                      color: Colors.white,
                                    )),
                              ],
                            ),
                            Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Text(
                                    "${DateTime.now().day}/${DateTime.now().month}/${DateTime.now().year}",
                                    style: mediumSizeBolder
                                        .merge(TextStyle(color: Colors.white))),
                                TextButton.icon(
                                  icon: Icon(Icons.logout_rounded),
                                  style: ButtonStyle(
                                      shape: WidgetStateProperty.all(
                                          RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(8.0),
                                      )),
                                      backgroundColor:
                                          WidgetStateProperty.all(Colors.white),
                                      foregroundColor:
                                          WidgetStateProperty.all(color1)),
                                  label: Text("Logout"),
                                  onPressed: () {
                                    widget.loggingOut();
                                  },
                                )
                              ],
                            )
                          ]),
                    )),
                ClipRRect(
                  borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(16.0),
                      topRight: Radius.circular(16.0)),
                  child: Container(
                    padding: EdgeInsets.all(16),
                    color: Colors.white,
                    constraints: BoxConstraints(
                        minHeight: MediaQuery.of(context).size.height,
                        minWidth: double.infinity),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // #ff9472
                        Container(
                          decoration: const BoxDecoration(
                            borderRadius:
                                BorderRadius.all(Radius.circular(16.0)),
                            gradient: LinearGradient(
                                colors: [
                                  Color(0xFFea5459),
                                  Color.fromARGB(255, 242, 171, 4),
                                ],
                                begin: FractionalOffset(0.0, 0.0),
                                end: FractionalOffset(1.0, 0.0),
                                stops: [0.0, 1.0],
                                tileMode: TileMode.mirror),
                          ),
                          child: Card(
                              shadowColor: Colors.black,
                              elevation: 10,
                              color: Colors.transparent,
                              child: Padding(
                                padding: EdgeInsets.all(16.0),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          "Current Balance",
                                          style: TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.w300,
                                              fontSize: 20.0),
                                        ),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Text(
                                            format
                                                .format(value.paidAmount)
                                                .toString(),
                                            style:
                                                TextStyle(color: Colors.white)
                                                    .merge(largeSizeBolder)),
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Text(
                                            format
                                                .format(value.totalAmount)
                                                .toString(),
                                            style:
                                                TextStyle(color: Colors.white)
                                                    .merge(mediumSizeBolder))
                                      ],
                                    ),
                                    const Flexible(
                                      child: Padding(
                                          padding: EdgeInsets.all(16.0),
                                          child: Image(
                                            image:
                                                AssetImage('assets/money.png'),
                                          )),
                                    )
                                  ],
                                ),
                              )),
                        ),
                        SizedBox(height: 30),

                        Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              CircularPercentIndicator(
                                  progressColor: Colors.green,
                                  radius: 60.0,
                                  lineWidth: 8.0,
                                  percent: value.paidEmis / value.totalEmis,
                                  animation: true,
                                  animationDuration: 2000,
                                  center: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: [
                                        Text("Paid Emis",
                                            style: smallSizeBolder),
                                        Text(
                                            "${value.paidEmis}/${value.totalEmis}")
                                      ])),
                              const SizedBox(
                                width: 20,
                              ),
                              Column(children: [
                                Text(
                                  "Members",
                                  style: smallSizeBolder,
                                ),
                                Text(value.Users.length.toString()),
                              ]),
                              const SizedBox(
                                width: 20,
                              ),
                              Column(
                                children: [
                                  Text("Ongoing Emis", style: smallSizeBolder),
                                  Text("100")
                                ],
                              )
                            ]),
                        SizedBox(height: 30),

                        TextButton.icon(
                          icon: Icon(Icons.add),
                          style: ButtonStyle(
                              shape: WidgetStateProperty.all(
                                  RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(4.0),
                              )),
                              backgroundColor: WidgetStateProperty.all(color1),
                              foregroundColor:
                                  WidgetStateProperty.all(Colors.white)),
                          label: Text("Create new User"),
                          onPressed: () {
                            addUserDialog(context);
                          },
                        ),

                        SizedBox(
                          height: 30,
                        ),
                        Column(
                          children: [
                            Text("Ending EMIS for this month",
                                style: mediumSizeBolder),
                            for (var i in value.endFor)
                              Row(
                                children: [
                                  Text(i["name"]
                                          .toString()
                                          .substring(0, 1)
                                          .toUpperCase() +
                                      i["name"].toString().substring(1)),
                                  const SizedBox(
                                    width: 50,
                                  ),
                                  Text(i["loanTenure"].toString() + " months"),
                                  const SizedBox(
                                    width: 50,
                                  ),
                                  TextButton(
                                      onPressed: () {
                                        widget.changePage(1);
                                      },
                                      child: Text("View More")),
                                  const SizedBox(
                                    height: 30,
                                  ),
                                ],
                              ),
                          ],
                        ),
                      ],
                    ),
                  ),
                )
              ])));
    });
  }
}
