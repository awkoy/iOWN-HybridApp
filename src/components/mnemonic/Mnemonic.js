import "./Mnemonic.sass";

import React from "react";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

export default class Mnemonic extends React.Component {
    renderColumn = indexes => {
        const {
            mnemonic,
            editable,
            fullEditable,
            enabledIndexes,
            onChange,
        } = this.props;

        return mnemonic.filter((i, j) => indexes.includes(j)).map((i, j) =>
            <div className={"mnemonic-cell"} key={j}>
                {!fullEditable &&
                    <Box p={1}>
                        <TextField
                            label={indexes[j] + 1}
                            disabled={(!editable) || !enabledIndexes.includes(indexes[j])}
                            value={mnemonic[indexes[j]]}
                            variant="filled"
                            inputProps={{
                                autoCapitalize: 'none',
                            }}
                            onChange={editable ? e => onChange(e.target.value, indexes[j]) : null}
                        />
                    </Box>
                }
                {fullEditable &&
                    <Box p={1}>
                        <TextField
                            label={indexes[j] + 1}
                            value={mnemonic[indexes[j]]}
                            variant="filled"
                            inputProps={{
                                autoCapitalize: 'none',
                            }}
                            onChange={editable ? e => onChange(e.target.value, indexes[j]) : null}
                        />
                    </Box>
                }
            </div>);
    };

    render() {
        return (
            <div className={"mnemonic-row"}>
                <div className={"mnemonic-column"}>
                    {this.renderColumn([0, 3, 6, 9])}
                </div>
                <div className={"mnemonic-column"}>
                    {this.renderColumn([1, 4, 7, 10])}
                </div>
                <div className={"mnemonic-column"}>
                    {this.renderColumn([2, 5, 8, 11])}
                </div>
            </div>
        );
    }
}

Mnemonic.propTypes = {
    editable: PropTypes.bool,
    mnemonic: PropTypes.array,
    enabledIndexes: PropTypes.array,

    onChange: PropTypes.func,
};
