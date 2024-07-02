import 'package:flutter/material.dart';
import 'package:frontend/constants.dart';

class PercentageCard extends StatelessWidget {
  var icons, label, number;

  PercentageCard(this.icons, this.label, this.number);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Card(
      color: Colors.white,
      elevation: 8,
      child: Padding( padding : EdgeInsets.all(10) , child :  Column(
        children: [  this.icons, SizedBox(height : 10),  Text(this.label , style : smallSizeLighter),  SizedBox(height : 10) , Text(this.number , style : mediumSizeBolder)],
      )),
    );
  }
}
