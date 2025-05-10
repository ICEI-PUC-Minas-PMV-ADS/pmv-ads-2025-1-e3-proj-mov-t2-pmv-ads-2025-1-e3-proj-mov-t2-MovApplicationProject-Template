import { View, StyleSheet, Image } from "react-native"

export const Header = () => {
  return (
    <>
      <View style={styles.header} />
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel="Logo do Wally"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#9ACBD0",
    height: 100,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 60,
    zIndex: 10,
  },
  logo: {
    width: 66,
    height: 66,
  },
})