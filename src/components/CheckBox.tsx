import React, {ChangeEvent, FC} from 'react';
import Checkbox from "@mui/material/Checkbox";

type CheckBoxType = {
    callBack: (e: ChangeEvent<HTMLInputElement>) => void
    isDone: boolean
}
export const CheckBoxComponent: FC<CheckBoxType> = ({callBack, isDone}) => {
    return (
        <div>
            <Checkbox
                onChange={(e) => callBack(e)}
                checked={isDone}
                size={'small'}
                color={'primary'}
            />
        </div>
    );
};

