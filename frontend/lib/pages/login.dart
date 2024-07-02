import 'dart:convert';
import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';
import 'package:frontend/api_calls/apis.dart';
import 'package:frontend/api_calls/constants.dart';
import 'package:frontend/provider.dart';
import 'package:frontend/utils.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:wave/wave.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Login extends StatefulWidget {
  const Login({super.key, required this.loggingIn});

  final Function loggingIn;

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  // ignore: prefer_final_fields
  final _storage = const FlutterSecureStorage();

  String phoneNumberError = "", passwordError = "";

  bool phoneNumberVisited = false;

  bool passwordVisited = false;

  bool isPassword = true;

  bool requesting = false;

  void togglePasswordVisibility() {
    if (isPassword) {
      isPassword = false;
    } else {
      isPassword = true;
    }
  }

  void sendRequest(BuildContext context) async {
    if (!passwordVisited) {
      setState(() {
        passwordError = "Password should be of length atleast 8";
      });
    }
    if (!phoneNumberVisited) {
      setState(() {
        phoneNumberError = "Invalid Phone Number";
      });
    }
    if (phoneNumberError != "" || passwordError != "") {
      final snackBar = SnackBar(
        duration: const Duration(seconds: 3),
        content: const Text("Resolve field errors"),
        action: SnackBarAction(
          label: 'Undo',
          onPressed: () {},
        ),
      );

      ScaffoldMessenger.of(context).showSnackBar(snackBar);
      return;
    }

    setState(() {
      requesting = true;
    });

    try {
      final response = await postRequest({
        "phoneNumber": phoneNumberController.text,
        "password": passwordController.text
      }, login);

      if (response.statusCode == 400) {
        String message = jsonDecode(response.body)["error"];
        errorSnackbar(context, message);
      } else {
        print(response.body);

        String jwtToken = jsonDecode(response.body)["data"]["token"];

        _storage.write(key: "jwtToken", value: jwtToken);

        print(jwtToken);

        succesSnackbar(context, "Success");
        widget.loggingIn();
      }
    } on Exception catch (err) {
      print(err);
    }

    setState(() {
      requesting = false;
    });
  }

  void check() {
    var phoneNumber = phoneNumberController.text;
    var password = passwordController.text;

    // email validity
    if (phoneNumber.isEmpty || phoneNumber.length != 10) {
      setState(() {
        phoneNumberError = "Invalid Phone Number";
      });
    } else {
      setState(() {
        phoneNumberError = "";
      });
    }

    if (!passwordVisited) return;

    if (password.isEmpty || password.length < 8) {
      setState(() {
        passwordError = "Password should be of length atleast 8";
      });
    } else {
      setState(() {
        passwordError = "";
      });
    }

    //   final snackBar = SnackBar(
    //     duration: const Duration(seconds: 3),
    //     content: Text(_isAlert),
    //     action: SnackBarAction(
    //       label: 'Undo',
    //       onPressed: () {},
    //     ),
    //   );

    //   ScaffoldMessenger.of(context).showSnackBar(snackBar);
    // }
  }

  final phoneNumberController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        body: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text('LOGIN',
                  style: TextStyle(fontSize: 35.0, fontWeight: FontWeight.bold)
                  // style: CustomTextStyle.nameOfTextStyle,
                  ),
              const SizedBox(
                height: 20.0,
              ),
              const Text('Welcome back ',
                  style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.w400)
                  // style: CustomTextStyle.nameOfTextStyle2,
                  ),
              Card(
                  margin: const EdgeInsets.all(25.0),
                  child: Padding(
                    padding: const EdgeInsets.all(15.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        TextField(
                          onChanged: (String temp) {
                            phoneNumberVisited = true;
                            check();
                          },
                          keyboardType: TextInputType.number,
                          controller: phoneNumberController,
                          decoration: InputDecoration(
                              errorText: phoneNumberError == ""
                                  ? null
                                  : phoneNumberError,
                              contentPadding: const EdgeInsets.all(8.0),
                              hintText: "Enter your Phone Number",
                              labelText: "Phone Number"),
                        ),
                        const SizedBox(height: 20),
                        TextField(
                          onChanged: (String temp) {
                            passwordVisited = true;

                            check();
                          },
                          obscureText: isPassword,
                          controller: passwordController,
                          decoration: InputDecoration(
                              errorText:
                                  passwordError == "" ? null : passwordError,
                              suffixIcon: IconButton(
                                  icon: !isPassword
                                      ? const Icon(
                                          Icons.visibility,
                                        )
                                      : const Icon(Icons.visibility_off),
                                  onPressed: () => setState(() {
                                        if (isPassword) {
                                          isPassword = false;
                                        } else {
                                          isPassword = true;
                                        }
                                      })),
                              contentPadding: const EdgeInsets.all(8.0),
                              hintText: "Enter your Password",
                              labelText: "Password"),
                        ),
                        const SizedBox(height: 50),
                        FilledButton(
                            style: FilledButton.styleFrom(
                              shape: RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(20), // <-- Radius
                              ),
                            ),
                            onPressed: !requesting
                                ? () async {
                                    sendRequest(context);
                                  }
                                : null,
                            child: const Text("Login"))
                      ],
                    ),
                  )),
              // const CircularProgressIndicator()
              // SvgPicture.asset(
              //   '../assests/entry_image.svg',
              //   width: 200,
              //   height: 200,
              //   semanticsLabel: 'A sample SVG image',
              // ),
            ])); // Scaffold
  }
}
