import PropTypes from "prop-types";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Form, Label, Input, Button } from "./ContactForm.styled";

export default function ContactForm({ onSubmit }) {
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");

	const nameInputId = nanoid();
	const numberInputId = nanoid();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "name":
				setName(value);
				break;
			case "number":
				setNumber(value);
				break;
			default:
				return;
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(name, number);
		resetInput();
	};
	const resetInput = () => {
		setName("");
		setNumber("");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Label htmlFor={nameInputId}>
				Name
				<Input
					type="text"
					name="name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					id={nameInputId}
					value={name}
					onChange={handleInputChange}
					placeholder="Andrei Potapov"
				/>
			</Label>
			<Label htmlFor={numberInputId}>
				Number
				<Input
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					id={numberInputId}
					value={number}
					onChange={handleInputChange}
					placeholder="111-11-11"
				/>
			</Label>
			<Button type="submit">Add contact</Button>
		</Form>
	);
}

ContactForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
