import 'dart:convert';
import 'dart:developer';
import 'package:flutter/material.dart';
import "dart:collection";
import 'package:frontend/api_calls/apis.dart';
import 'package:frontend/api_calls/constants.dart';

class DataProvider extends ChangeNotifier {
  late List Users = [];

  late var userData = {};

  late var events = {};

  late var fetchedMonths = Set();

  late var endFor = [];

  var currentDate = DateTime.now();

  int totalAmount = 0, paidAmount = 0, totalEmis = 0, paidEmis = 0;

  late List filteredUsers = [];

  Future<void> userDataHandler(var id) async {
    final resp = await getRequest(getUser + id.toString());

    if (resp.statusCode == 200) {
      var _data = jsonDecode(resp.body)["data"];

      print(_data);

      for (var i = 0; i < _data["Emis"].length; i++) {
        _data["Emis"][i]["index"] = i;
      }

      userData = _data;

      notifyListeners();
    }
  }

  void updateFetchedMonths(String temp) {
    fetchedMonths.add(temp);
    notifyListeners();
  }

  void updateDate(DateTime t) {
    currentDate = t;
    notifyListeners();
  }

  void updateEvents(var _events) {
    events = _events;
    notifyListeners();
  }

  void fetchData() async {
    print("Fetching baby!!!!!!!");

    List Users_ = [];

    totalAmount = 0;
    paidAmount = 0;
    totalEmis = 0;
    paidEmis = 0;

    // notifyListeners();

    final resp = await getRequest(getAllUser);

    if (resp.statusCode != 200) {
      return;
    }

    var data = jsonDecode(resp.body);

    data = data["data"];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var paid = 0;

      var temp = {};
      temp["name"] = item["name"];
      temp["phoneNumber"] = item["phoneNumber"];
      temp["id"] = item["id"];
      temp["emis"] = [];

      for (var j = 0; j < item["Emis"].length; j++) {
        temp["emis"].add({
          "monthlyAmount": item["Emis"][j]["monthlyAmount"],
          "isPaid": item["Emis"][j]["Pays"][0]["isPaid"],
          "emi_id": item["Emis"][j]["id"]
        });

        print(item["Emis"][j]["Pays"][0]["monthlyAmount"]);

        totalAmount += item["Emis"][j]["monthlyAmount"] as int;

        if (item["Emis"][j]["Pays"][0]["isPaid"]) {
          paidAmount += item["Emis"][j]["monthlyAmount"] as int;
        }

        paid += item["Emis"][j]["Pays"][0]["isPaid"] ? 1 : 0;
        totalEmis++;

        paidEmis += item["Emis"][j]["Pays"][0]["isPaid"] ? 1 : 0;
      }

      temp["emisPaid"] = paid;

      Users_.add(temp);
    }

    Users = Users_;

    Users.sort((a,b){
       return a["name"].compareTo(b["name"])==-1 ? 0 :1 ;
    });

    filteredUsers = Users;

    // fetching the end-for

    final r = await getRequest(endForUrl);

    data = jsonDecode(r.body);

    data = data["data"];

    endFor = data;

    print(endFor);

    notifyListeners();
  }

  void updateUI(int userIndex, bool isPaid, dynamic item) {
    //update paid amount
    int emiIndex = 0;

    for (var i = 0; i < Users[userIndex]["emis"].length; i++) {
      if (Users[userIndex]["emis"][i]["emi_id"] == item["emi_id"]) {
        emiIndex = i;
      }
    }
    if (isPaid) {
      paidEmis--;

      paidAmount -= Users[userIndex]["emis"][emiIndex]["monthlyAmount"] as int;
      Users[userIndex]["emisPaid"] -= 1;
      Users[userIndex]["emis"][emiIndex]["isPaid"] = false;
    } else {
      paidEmis++;
      paidAmount += Users[userIndex]["emis"][emiIndex]["monthlyAmount"] as int;
      Users[userIndex]["emisPaid"] += 1;
      Users[userIndex]["emis"][emiIndex]["isPaid"] = true;
    }

    notifyListeners();
  }

  void search(String text) {
    filteredUsers = Users.where((item) => item["name"].contains(text)).toList();

    notifyListeners();

    print(text);
    print(filteredUsers);
  }

  void clearSearch() {
    filteredUsers = Users;
    notifyListeners();
  }

  Future fetchOneUser(int UserId) async {
    print(UserId);
    var resp = await getRequest(getUser + UserId.toString());
    return resp.body;
  }
}
