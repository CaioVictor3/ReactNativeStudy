import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import "react-native-reanimated";

import { migrate } from "@/src/database/migrate";
import { RootNavigator } from "../src/navigation/RootNavigator";

export default function RootLayout() {
	return (
		<Suspense fallback={<ActivityIndicator />}>
			<SQLiteProvider
				databaseName="financeiro.db"
				onInit={migrate}
				useSuspense
			>
				<RootNavigator />
				<StatusBar style="auto" />
			</SQLiteProvider>
		</Suspense>
	);
}
