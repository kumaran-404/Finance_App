import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:frontend/components/user_view.dart';
import 'package:frontend/constants.dart';

import 'dart:math';

import 'package:frontend/provider.dart';
import 'package:provider/provider.dart';

Random random = Random();

final avatarColors = [color1, color2, color3, color4, color5];

class Users extends StatefulWidget {
  const Users({super.key});

  @override
  State<StatefulWidget> createState() {
    return _Users();
  }
}

class _Users extends State<Users> {
  final searchController = TextEditingController();

  bool isSearchBar = false;

  int currentUser = -1, currentUserIndex = -1;

  bool isAllUserScreen = true;

  void toggleScreen() {
    setState(() {
      isAllUserScreen = true;
      currentUser = -1;
      currentUserIndex = -1;
    });
  }

  Future<void> changeSearchBarVisibility() async {
    setState(() {
      isSearchBar = !isSearchBar;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<DataProvider>(
        builder: (BuildContext context, DataProvider value, Widget? child) {
      return Scaffold(
          backgroundColor: (!isAllUserScreen && currentUser != -1)
              ? Colors.transparent
              : const Color(0xFF3F51B5),
          body: (!isAllUserScreen && currentUser != -1)
              ? Expanded(
                  child: UserView(currentUser, currentUserIndex, toggleScreen))
              : RefreshIndicator(
                  onRefresh: changeSearchBarVisibility,
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        isSearchBar
                            ? Padding(
                                padding: const EdgeInsets.only(
                                    left: 20, top: 50, bottom: 20, right: 20),
                                child: SearchBar(
                                  controller: searchController,
                                  hintText: "Search users",
                                  onChanged: (String t) {
                                    value.search(searchController.text);
                                    setState(() {
                                      true;
                                    });
                                  },
                                  leading: const Icon(Icons.search),
                                  backgroundColor: const WidgetStatePropertyAll(
                                      Colors.white),
                                  padding: const WidgetStatePropertyAll(
                                      EdgeInsets.all(10.0)),
                                  autoFocus: true,
                                ),
                              )
                            : SizedBox(),
                        if (value.filteredUsers.length != value.Users.length)
                          Container(
                              margin:
                                  EdgeInsets.only(top: 25, left: 30, right: 30),
                              child: ElevatedButton.icon(
                                  icon: Icon(Icons.clear),
                                  onPressed: () {
                                    value.clearSearch();
                                    searchController.clear();
                                  },
                                  label: Text("Clear Search"))),
                        if (value.filteredUsers.length != value.Users.length)
                          SizedBox(height: 20),
                        Expanded(
                            child: ClipRRect(
                                borderRadius: const BorderRadius.only(
                                    topLeft: Radius.circular(16.0),
                                    topRight: Radius.circular(16.0)),
                                child: (value.filteredUsers.isEmpty)
                                    ? Container(
                                        color: Colors.white,
                                        child: const Center(
                                          child: Text("No Users found"),
                                        ))
                                    : Container(
                                        padding: const EdgeInsets.all(16),
                                        color: Colors.white,
                                        child:
                                            

                                            ListView.builder(
                                          scrollDirection: Axis.vertical,
                                          itemBuilder: (context, index) {
                                            return TextButton(
                                                onPressed: () {
                                                  setState(() {
                                                    currentUser =
                                                        value.filteredUsers[
                                                            index]["id"];
                                                    currentUserIndex = index;
                                                    isAllUserScreen = false;
                                                  });
                                                },
                                                child: Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            left: 30,
                                                            right: 10,
                                                            top: 20,
                                                            bottom: 20),
                                                    child: Row(
                                                      crossAxisAlignment:
                                                          CrossAxisAlignment
                                                              .center,
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .start,
                                                      children: [
                                                        CircleAvatar(
                                                          radius: 30,
                                                          backgroundColor: avatarColors[
                                                              value.filteredUsers[
                                                                          index]
                                                                      ["id"] %
                                                                  5],
                                                          child: Text(
                                                            value.Users[index]
                                                                    ["name"]
                                                                .toString()
                                                                .toUpperCase()
                                                                .substring(
                                                                    0, 2),
                                                            style:
                                                                const TextStyle(
                                                                    color: Colors
                                                                        .white),
                                                          ),
                                                        ),
                                                        const SizedBox(
                                                          width: 30,
                                                        ),
                                                        Column(
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Text(
                                                              value
                                                                  .filteredUsers[
                                                                      index]
                                                                      ["name"]
                                                                  .toString()
                                                                  .toUpperCase(),
                                                              style:
                                                                  mediumSizeBolder,
                                                            ),
                                                            Text(value.filteredUsers[
                                                                    index]
                                                                ["phoneNumber"])
                                                          ],
                                                        ),
                                                        const Expanded(
                                                          child: SizedBox(),
                                                        ),
                                                        Text(
                                                          "${value.filteredUsers[index]["emisPaid"]}/${value.filteredUsers[index]["emis"].length}",
                                                          style: TextStyle(
                                                              color: value.filteredUsers[
                                                                              index]
                                                                          [
                                                                          "emisPaid"] ==
                                                                      value
                                                                          .filteredUsers[
                                                                              index]
                                                                              [
                                                                              "emis"]
                                                                          .length
                                                                  ? Colors.green
                                                                  : Colors.red),
                                                        ),
                                                        IconButton(
                                                            onPressed: () {
                                                              setState(() {
                                                                currentUser =
                                                                    value.filteredUsers[
                                                                            index]
                                                                        ["id"];
                                                                currentUserIndex =
                                                                    index;
                                                                isAllUserScreen =
                                                                    false;
                                                              });
                                                            },
                                                            icon: const Icon(Icons
                                                                .chevron_right))
                                                      ],
                                                    )));
                                          },
                                          itemCount: value.filteredUsers.length,
                                        ))
                                // ])),
                                ))
                      ]),
                ));
    });
  }
}
