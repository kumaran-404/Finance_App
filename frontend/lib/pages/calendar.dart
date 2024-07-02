import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:frontend/api_calls/apis.dart';
import 'package:frontend/api_calls/constants.dart';
import 'package:frontend/provider.dart';
import 'package:provider/provider.dart';
import 'package:table_calendar/table_calendar.dart';
import "../constants.dart";

class Calendar extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _Calendar();
  }
}

class _Calendar extends State<Calendar> {
  DateTime _focusedDay = DateTime.now();

  // void intialFunction() async {
  //   var resp = await postRequest(
  //       {"month": _focusedDay.month, "year": _focusedDay.year}, monthly);

  //   updateEvents(jsonDecode(resp.body)["data"]);
  // }

  String getString(DateTime date) {
    return "${date.day}-${date.month}-${date.year}";
  }

  dynamic updateEvents(var events, var data) {
    var _events = events;

    for (var i = 0; i < data.length; i++) {
      var item = data[i];

      var date = DateTime.parse(item[1]["date"].toString());

      var stringDate = getString(date);

      if (!_events.containsKey(stringDate)) {
        _events[stringDate] = [];
      }

      _events[stringDate].add(Row(children: [
        Text(
            item[1]["user"]["name"].toString().toUpperCase().substring(0, 1) +
                item[1]["user"]["name"].toString().substring(1),
            style: mediumSizeBolder),
        SizedBox(width: 10),
        Text(
          item[0],
          style: TextStyle(color: color1).merge(mediumSizeLighter),
        ),
        SizedBox(width: 10),
        item[0] == "paid" ? Text("₹${item[1]["monthlyAmount"]}") : SizedBox(),
        TextButton(onPressed: null, child: Text("Know More"))
      ]));
    }

    return _events;
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<DataProvider>(
        builder: (BuildContext context, DataProvider value, Widget? child) {
      return Scaffold(
          body: Padding(
              padding: const EdgeInsets.only(left: 20, top: 50, bottom: 20),
              child: SingleChildScrollView(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                    TableCalendar(
                      calendarBuilders:
                          CalendarBuilders(markerBuilder: (context, t, l) {
                        if (l.isNotEmpty) {
                          return Container(
                            margin: const EdgeInsets.only(top: 20),
                            padding: const EdgeInsets.all(1),
                            child: Container(
                              // height: 7,
                              width: 8,
                              decoration: const BoxDecoration(
                                  shape: BoxShape.circle, color: Colors.red),
                            ),
                          );
                        }
                        return null;
                      }),
                      selectedDayPredicate: (DateTime t) {
                        return value.currentDate == t;
                      },
                      focusedDay: _focusedDay,
                      eventLoader: (DateTime date) {
                        var stringDate = getString(date);

                        return value.events.containsKey(stringDate)
                            ? value.events[stringDate]
                            : [];
                      },
                      onDaySelected:
                          (DateTime selectedDate, DateTime focusedDate) {
                        value.updateDate(selectedDate);
                      },
                      onCalendarCreated: (p) async {
                        String temp =
                            "${DateTime.now().month}_${DateTime.now().year}";

                        if (value.fetchedMonths.contains(temp)) return;

                        var resp = await postRequest({
                          "month": DateTime.now().month,
                          "year": DateTime.now().year
                        }, monthly);

                        if (resp.statusCode == 200) {
                          if (jsonDecode(resp.body)["data"]) {
                            value.updateEvents(updateEvents(
                                value.events, jsonDecode(resp.body)["data"]));

                            value.updateFetchedMonths(temp);
                          }
                        }
                      },
                      onPageChanged: (DateTime t) async {
                        String temp = "${t.month}_${t.year}";

                        setState(() {
                          _focusedDay = t;
                        });

                        value.updateDate(t);

                        if (value.fetchedMonths.contains(temp)) return;

                        var resp = await postRequest(
                            {"month": t.month, "year": t.year}, monthly);

                        value.updateEvents(updateEvents(
                            value.events, jsonDecode(resp.body)["data"]));
                        value.updateFetchedMonths(temp);
                      },
                      firstDay: DateTime.utc(2010, 10, 16),
                      lastDay: DateTime.utc(2030, 3, 14),
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: value.events
                              .containsKey(getString(value.currentDate))
                          ? <Widget>[
                              for (var item
                                  in value.events[getString(value.currentDate)])
                                item
                            ]
                          : [const Text("No entries for this day")],
                    )
                  ]))));
    });
  }
}
