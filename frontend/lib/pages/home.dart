import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:frontend/api_calls/apis.dart';
import 'package:frontend/pages/calendar.dart';
import 'package:frontend/pages/home_main.dart';
import 'package:frontend/pages/manage_users.dart';
import 'package:frontend/provider.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  Function loggingOut;

  HomePage({required this.loggingOut});

  @override
  State<StatefulWidget> createState() {
    return _HomePage();
  }
}

class _HomePage extends State<HomePage> {
  final PageController pageController = PageController(initialPage: 0);
  late int _selectedIndex = 0;

  Map<String, dynamic> data = {};

  late Map<String, dynamic> dateWise;

  @override
  Widget build(BuildContext context) {
    void changePage(index) {
      setState(() {
        _selectedIndex = index;
        pageController.jumpToPage(index);
      });
    }

    return Consumer<DataProvider>(
        builder: (BuildContext context, DataProvider value, Widget? child) {
      return Scaffold(
          extendBody: true,
          extendBodyBehindAppBar: true,
          body: PageView(
            physics: const PageScrollPhysics(),
            onPageChanged: (index) {
              setState(() {
                _selectedIndex = index;
              });
            },
            controller: pageController,
            children: [
              HomeMain(widget.loggingOut , changePage),
              const Users(),
              Calendar(),
            ],
          ),
          bottomNavigationBar: BottomNavigationBar(
            iconSize: 30,
            selectedFontSize: 10,
            backgroundColor: Colors.white,
            currentIndex: _selectedIndex,
            selectedItemColor: const Color.fromARGB(255, 63, 81, 181),
            unselectedItemColor: const Color.fromARGB(255, 171, 182, 248),
            type: BottomNavigationBarType.fixed,
            items: const [
              BottomNavigationBarItem(
                  icon: Icon(
                    Icons.home,
                  ),
                  label: "Home"),
              BottomNavigationBarItem(
                  icon: Icon(Icons.manage_accounts), label: "Users"),
              BottomNavigationBarItem(
                  icon: Icon(Icons.calendar_month), label: "Periodic"),
            ],
            onTap: (index) {
              changePage(index);
            },
          ));
    });
  }
}
