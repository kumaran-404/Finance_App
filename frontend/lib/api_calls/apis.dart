import 'dart:convert';
import 'package:http/http.dart' as http;

String baseURL = 'http://192.168.43.101:80/api/';

Future<http.Response> verifyJwtTokenHandler(String jwtToken) {
  return http.post(
    Uri.parse('${baseURL}auth/verifyJWT/'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $jwtToken'
    },
  );
}

Future<http.Response> postRequest(dynamic data, String URL) {
  return http.post(
    Uri.parse(baseURL + URL),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(data),
  );
}

Future<http.Response> getRequest(String URL) {
  return http.get(
    Uri.parse(baseURL + URL),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
  );
}
