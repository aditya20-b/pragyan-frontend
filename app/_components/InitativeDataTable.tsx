"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { initiativeData } from "../_data/Initiative";
import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function InitiativeDropdown({ dispCity }: { dispCity: string }) {
	const [selectedRows, setSelectedRows] = useState<
		{
			Project: string;
			City: string;
			Funding: number;
		}[]
	>();
	const [tableData, setTableData] = useState(initiativeData);
	const [showButton, setShowButton] = useState(true); // New state variable for button visibility



	const handlePostRequest = async (selectedRows: any) => {
		console.log(selectedRows);
		try {
			const response = await fetch('http://100.93.36.23:8000/calc/fund_recalc', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(selectedRows), // Send selected rows data
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const result = await response.json();
			console.log('Success:', result);
			// initiativeData = result;
			setTableData(result)
			setShowButton(false);
		} catch (error) {
			console.error('Error:', error);
		}
	};


	return (
		<div>
			<Table className="text-xs w-full col-span-1 overflow-x-scroll">
				<TableCaption>A list of initiatives taken by the Government.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead></TableHead>
						{Object.keys(tableData[0]).map((data, index) => {
                        return <TableHead key={index}>{data}</TableHead>;
						})}
					</TableRow>
				</TableHeader>
				<TableBody>
					{tableData
						.filter((dataVal) => {
							return dataVal.City === dispCity;
						})
						.map((dataVal, ival) => {
							return (
								<TableRow key={dataVal.Project + ival}>
									<DataRow
										dataVal={dataVal}
										selectedRows={selectedRows}
										setSelectedRows={setSelectedRows}
										isCheckBoxDisabled={!showButton}
									/>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
			{showButton &&
					<Button className="text-xs w-full col-span-1 ml-auto" onClick={() => handlePostRequest(selectedRows)}>Submit</Button>}
		</div>
	);
}

function DataRow({
	dataVal,
	setSelectedRows,
	selectedRows,
	isCheckBoxDisabled
}: {
	dataVal: any;
	setSelectedRows: CallableFunction;
	selectedRows:
	| {
		Project: string;
		City: string;
		Funding: number;
	}[]
	| undefined;
	isCheckBoxDisabled: boolean
}) {
	const [checkState, setCheckState] = useState(false);
	return (
		<>
		
			<TableCell>
				<input
					checked={checkState}
					type="checkbox"
					onChange={() => {
						setCheckState(!checkState);
						console.log(checkState);

						if (!checkState) {
							if (selectedRows) {
								setSelectedRows([...selectedRows, dataVal]);
								console.log(selectedRows);
							} else {
								setSelectedRows([dataVal]);
							}
						} else {
							setSelectedRows(
								selectedRows?.filter((data) => {
									return data.Project !== dataVal.Project;
								})
							);
						}
					}}
					disabled={isCheckBoxDisabled}
				></input>
			</TableCell>
			<>
				{Object.values(dataVal).map((data: any, ival) => {
					return <TableCell key={dataVal.Project + ival}>{data}</TableCell>;
				})}
			</>
		</>
	);
}
