"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

export function GradosFilters({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (val: string) => void;
}): React.JSX.Element {
	return (
		<Card sx={{ p: 2 }}>
			<OutlinedInput
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				fullWidth
				placeholder="Buscar grado por nivel o año"
				startAdornment={
					<InputAdornment position="start">
						<MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
					</InputAdornment>
				}
				sx={{ maxWidth: "500px" }}
			/>
		</Card>
	);
}
