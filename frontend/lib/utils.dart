import 'package:flutter/material.dart';

void succesSnackbar(BuildContext context, String message) {
  final snackBar = SnackBar(
    backgroundColor: Colors.green,
    duration: const Duration(seconds: 3),
    content: Text(message),
    action: SnackBarAction(
      label: 'close',
      onPressed: () {},
    ),
  );

  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}

void errorSnackbar(BuildContext context, String message) {
  final snackBar = SnackBar(
    backgroundColor: Colors.red,
    duration: const Duration(seconds: 3),
    content: Text(message),
    action: SnackBarAction(
      label: 'close',
      onPressed: () {},
    ),
  );

  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}
