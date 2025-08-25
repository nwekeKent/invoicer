"use client";

import React from "react";
import Loader from "@/components/shared/Loader";
import { useVerifyTokenRedirect } from "@/hooks";

export default function Home() {
	useVerifyTokenRedirect();

	return <Loader />;
}
