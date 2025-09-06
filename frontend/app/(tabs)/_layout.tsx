import { icons } from '@/constants/icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface TabIconProps {
    name: string;
    focused: boolean;
    icon: any;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, icon }) => {
    if (focused) {
        return (
            <View className="items-center bg-green-200 justify-center h-[60px] rounded-[10%] w-[80px]">
                <Image
                    source={icon}
                    className="w-6 h-6"
                    tintColor="#151312"
                />
                <Text className="text-xs mt-1 font-medium text-[#151312] capitalize">
                    {name}
                </Text>
            </View>
        );
    }
    return (
        <View className="items-center justify-center h-[60px] bg-green-100 rounded-[10%] w-[80px] py-2">
            <Image
                source={icon}
                className="w-6 h-6 text-align-center mx-auto"
                tintColor="#666666"
            />
            <Text className="text-xs mt-1 font-medium text-[#666666] capitalize">
                {name}
            </Text>
        </View>
    );
}

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: 100,
                    backgroundColor: "#dcfce7",
                    borderRadius: 30,
                    padding: 5,
                    margin: 3,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: 30,
                },
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            name="home"
                            icon={icons.home}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            name="profile"
                            icon={icons.person}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="list"
                options={{
                    title: "list",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            name="list"
                            icon={icons.search}
                        />
                    )
                }}
            />
        </Tabs>
    );
};

export default TabLayout;