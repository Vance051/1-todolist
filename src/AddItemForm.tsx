import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }


    return <div>
        <TextField
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            // className={error ? "error" : ""}
            id="outlined-basic"
            label={error ? error : "Enter title"}
            variant="outlined"
            size={'small'}
            error={!!error}
        />

        <IconButton onClick={addItem} color={"primary"}>
            <AddBox/>
        </IconButton>


    </div>
}
