import 'package:flutter/material.dart';
import 'package:frontend/api_calls/apis.dart';
import 'package:frontend/api_calls/constants.dart';
import 'package:frontend/constants.dart';
import 'package:frontend/utils.dart';

void addUserDialog(context) {
  late String name = "", phoneNumber = "", email = "";

  void handler() async {
    print(name);
    print(phoneNumber);
    print(email);

    var resp = await postRequest(
        {"name": name, "phoneNumber": phoneNumber, "email": email}, createSingleUser);

    if (resp.statusCode == 200) {
      succesSnackbar(context, "User Created");
    } else {
      errorSnackbar(context, "User creation failed");
    }
  }

  showDialog<String>(
      context: context,
      builder: (BuildContext context) => Center(
            child: SingleChildScrollView(
                child: AlertDialog(
              title: const Text('Add New User'),
              content: Column(
                children: [
                  TextField(
                      onChanged: (String t) {
                        name = t;
                      },
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.all(8.0),
                          hintText: "Enter your Name",
                          labelText: "Name")),
                  TextField(
                      onChanged: (String t) {
                        email = t;
                      },
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.all(8.0),
                          hintText: "Enter your Email",
                          labelText: "Email")),
                  TextField(
                      onChanged: (String t) {
                        phoneNumber = t;
                      },
                      decoration: InputDecoration(
                          contentPadding: const EdgeInsets.all(8.0),
                          hintText: "Enter your Phone Number",
                          labelText: "Phone Number")),
                ],
              ),
              actions: <Widget>[
                TextButton(
                  onPressed: () => Navigator.pop(context, 'Cancel'),
                  child: const Text('Go Back'),
                ),
                TextButton(
                  style: ButtonStyle(
                      backgroundColor: WidgetStateProperty.all(Colors.green),
                      foregroundColor: WidgetStateProperty.all(Colors.white)),
                  onPressed: () async {
                    handler();
                  },
                  child: const Text('Create'),
                ),
              ],
            )),
          ));
}
