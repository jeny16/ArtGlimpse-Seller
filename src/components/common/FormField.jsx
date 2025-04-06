// import React from 'react';
// import { TextField, useTheme } from '@mui/material';

// function FormField({
//     name,
//     label,
//     placeholder,
//     type = 'text',
//     register,
//     error,
//     helperText,
//     autoComplete,
//     validationRules
// }) {
//     const theme = useTheme();
//     // Use the provided name or fallback to a normalized label (e.g. "Full Name" becomes "fullname")
//     const fieldName = name || label.toLowerCase().replace(/\s/g, '');

//     return (
//         <TextField
//             fullWidth
//             label={label}
//             placeholder={placeholder}
//             type={type}
//             autoComplete={autoComplete}
//             error={!!error}
//             helperText={helperText}
//             {...register(fieldName, validationRules)}
//             InputProps={{
//                 sx: {
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: theme.palette.custom.highlight,
//                     },
//                     '&.Mui-focused .MuiInputBase-input': {
//                         color: theme.palette.custom.highlight,
//                     },
//                 },
//             }}
//             InputLabelProps={{
//                 sx: {
//                     '&.Mui-focused': {
//                         color: theme.palette.custom.highlight,
//                     },
//                 },
//             }}
//         />
//     );
// }

// export default FormField;


// import React from 'react';
// import { TextField, useTheme } from '@mui/material';

// function FormField({
//     name,
//     label,
//     placeholder,
//     type = 'text',
//     register,
//     error,
//     helperText,
//     autoComplete,
//     validationRules,
//     multiline,
//     rows
// }) {
//     const theme = useTheme();
//     // Use the provided name or fallback to a normalized label (e.g. "Full Name" becomes "fullname")
//     const fieldName = name || label.toLowerCase().replace(/\s/g, '');

//     // Special handling for date inputs
//     const dateInputProps = type === 'date' ? {
//         // Hide the placeholder when date field is focused or has a value
//         placeholder: '',
//     } : {};

//     return (
//         <TextField
//             fullWidth
//             label={label}
//             placeholder={placeholder}
//             type={type}
//             autoComplete={autoComplete}
//             error={!!error}
//             helperText={helperText}
//             multiline={multiline}
//             rows={rows}
//             {...register(fieldName, validationRules)}
//             InputProps={{
//                 ...dateInputProps,
//                 sx: {
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: theme.palette.custom.highlight,
//                     },
//                     '&.Mui-focused .MuiInputBase-input': {
//                         color: theme.palette.custom.highlight,
//                     },
//                 },
//             }}
//             InputLabelProps={{
//                 shrink: type === 'date' ? true : undefined,
//                 sx: {
//                     '&.Mui-focused': {
//                         color: theme.palette.custom.highlight,
//                     },
//                 },
//             }}
//         />
//     );
// }

// export default FormField;

import React from 'react';
import { TextField, useTheme } from '@mui/material';

function FormField({
    name,
    label,
    placeholder,
    type = 'text',
    register,
    error,
    helperText,
    autoComplete,
    validationRules,
    multiline,
    rows,
    fullWidth = true,
    onChange,
    value,
    InputProps,
    size,
    required = false,
    disabled = false
}) {
    const theme = useTheme();

    // Use the provided name or fallback to a normalized label
    const fieldName = name || label.toLowerCase().replace(/\s/g, '');

    // Special handling for date inputs
    const dateInputProps = type === 'date' ? {
        placeholder: '',
    } : {};

    return (
        <TextField
            name={fieldName}
            label={label}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error ? error.message : helperText}
            autoComplete={autoComplete}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            required={required}
            disabled={disabled}
            InputProps={InputProps}
            size={size}
            {...dateInputProps}
            {...(register && register(fieldName, validationRules))}
            sx={{
                '& label.Mui-focused': {
                    color: theme.palette.custom.highlight,
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.custom.highlight,
                    },
                },
                mb: 2
            }}
        />
    );
}

export default FormField;