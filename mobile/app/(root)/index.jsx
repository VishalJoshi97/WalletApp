import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();
  //user.id from clerk
 const {transactions,summary,isLoading,loadData,deleteTransactions} = useTransactions(user.id)

  useEffect(() => {
    loadData();
  },[loadData])
  
  console.log("transactions:", transactions);
  console.log("Summary:",summary);
  
  
  //and.. then this will be showed
  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        
        <SignOutButton />

      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
