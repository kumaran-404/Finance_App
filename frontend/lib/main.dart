import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:frontend/api_calls/apis.dart';
import 'package:frontend/pages/home.dart';
import 'package:frontend/pages/login.dart';
import 'package:frontend/pages/users/home.dart';
import 'package:frontend/provider.dart';
import 'package:frontend/utils.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:io' show Platform;

void main() {
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
      statusBarColor: Color.fromARGB(255, 63, 81, 181),
      systemNavigationBarColor: Colors.black));

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<StatefulWidget> createState() {
    return _MyApp();
  }
}

class _MyApp extends State<MyApp> {
  var isAdmin = -1;

  dynamic data;

  @override
  Widget build(BuildContext context) {
    Future<String?> jwtOrEmpty() async {
      final storage = new FlutterSecureStorage();
      String? value = await storage.read(key: "jwtToken");

      print(value);

      if (value == null) {
        return "N";
      }
      print("Requesting");

      var resp = await verifyJwtTokenHandler(value);

      isAdmin = jsonDecode(resp.body)["data"]["isAdmin"] ? 1 : 0;

      data = jsonDecode(resp.body)["data"];

      if (resp.statusCode == 200) {
        return "Success";
      } else {
        return "N";
      }
    }

    Future<String?> isAuth = jwtOrEmpty();

    void loggingOut() async {
      final storage = new FlutterSecureStorage();
      await storage.delete(key: "jwtToken");
      setState(() {
        isAuth = jwtOrEmpty();
      });
    }

    void loggingIn() async {
      setState(() {
        isAuth = jwtOrEmpty();
      });
    }

    return ChangeNotifierProvider(
        create: (context) => DataProvider(),
        child: MaterialApp(
          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(
                seedColor: const Color.fromARGB(255, 63, 81, 181)),
            useMaterial3: true,
          ),
          debugShowCheckedModeBanner: false,
          home: FutureBuilder(
              future: isAuth,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.done) {
                  if (snapshot.hasData) {
                    String status = snapshot.data as String;

                    if (status == "N") {
                      return Login(loggingIn: loggingIn);
                    } else {
                      if (isAdmin == 1) {
                        Provider.of<DataProvider>(context, listen: false)
                            .fetchData();
                        return HomePage(
                          loggingOut: loggingOut,
                        );
                      } else if (isAdmin == 0) {
                        return UserPage(data: data);
                      } else
                        return Platform.isAndroid
                            ? const Center(child: CircularProgressIndicator())
                            : const Center(child: CupertinoActivityIndicator());
                    }
                  } else {
                    return Login(loggingIn: loggingIn);
                  }
                } else {
                  return Platform.isAndroid
                      ? const Center(child: CircularProgressIndicator())
                      : const Center(child: CupertinoActivityIndicator());
                }
              }),
        ));
  }
}
