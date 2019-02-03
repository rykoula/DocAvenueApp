import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: 10,
    backgroundColor: "white"
  },
  h1text: {
    fontSize: 24,
    fontFamily: "Helvetica",
    color: "#032c33",
    fontWeight: "bold"
  },
  h2text: {
    fontSize: 16,
    fontFamily: "Helvetica",
    color: "#032c33",
    fontStyle: "italic"
  },
  flatview: {
    padding: 5,
    flexDirection: "column",
    margin: 10,
    backgroundColor: "#44a7b7"
  },
  flatview1: {
    flexDirection: "row"
  },
  title: {
    fontFamily: "Verdana",
    fontWeight: "bold",
    fontSize: 26,
    padding: 5,
    color: "white",
    flex: 4
  },
  subTitle: {
    fontFamily: "Verdana",
    fontWeight: "bold",
    fontSize: 16,
    color: "white"
  },
  details: {
    fontFamily: "Verdana",
    fontSize: 16,
    color: "white"
  },
  buttonArrow: {
    alignItems: "flex-end",
    padding: 10,
    flex: 1
  },
  buttonImage: {
    width: 25,
    height: 20
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#ffb200",
    borderRadius: 20,
    alignItems: "center",
    margin: 20
  },
  noLoadMoreBtn: {
    padding: 10,
    backgroundColor: "#d80f43",
    borderRadius: 20,
    alignItems: "center",
    margin: 20
  },
  loadMoreTxt: {
    color: "white"
  }
});

export default styles;
