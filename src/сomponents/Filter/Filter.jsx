import PropTypes from "prop-types";
import React from "react";
import { nanoid } from "nanoid";
import { Label, Input } from "./Filter.styled";

export default function Filter({ value, onChange }) {
	const filterInputId = nanoid();

	return (
		<Label htmlFor={filterInputId}>
			Find contacts by name
			<Input
				type="text"
				name="name"
				value={value}
				id={filterInputId}
				onChange={onChange}
				placeholder="Andrei Potapov"
			/>
		</Label>
	);
}
Filter.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};
