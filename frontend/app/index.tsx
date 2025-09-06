import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="h-[100vh] w-[100%] ">
      <View className="h-30 bg-red-500 p-5">
        <Text className=" font-bold text-2xl color-black">Hello World !! </Text>
      </View>
      <View className="flex flex-row justify-center items-center p-5 ">
        <Link href="/ExpenseDashboard" className="color-white font-bold text-2xl">View Dashboard</Link>
        <Link href="/expense/day1" className="color-white font-bold text-2xl" >Day-01</Link>
      </View>

    </View>
  );
}