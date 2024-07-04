import * as yup from 'yup';

export const ContactValidationsSchema = yup.object().shape({
    name: yup
        .string()
        .required('Required')
        .min(2, 'Name must be more than 2 characters')
        .max(60, 'Name must be less than 60 characters')
        .matches(
            /^[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ]+$/,
            'User name, must be contain only letters'
        ),
    surname: yup
        .string()
        .required('Required')
        .min(2, 'Surname must be more than 2 characters')
        .max(60, 'Surname must be less than 60 characters')
        .matches(
            /^[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ]+$/,
            'User surname, must be contain only letters'
        ),
    email: yup
        .string()
        .required('Required')
        .email()
        .min(2, 'Email must be more than 2 characters')
        .max(100, 'Email must be less than 100 characters')
        .matches(
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
            'User email, must be a valid email'
        ),
    phone: yup
        .string()
        .required('Required')
        .matches(
            /^[\+]{0,1}380/,
            'Number should start with code of Ukraine +380'
        )
        .matches(/^[\+]{0,1}380([0-9]{9})$/, 'And contain 9 numbers'),
    // anotherPersonReceive: yup.boolean().default(false),
});

export const DeliveryValidationsSchema = yup.object().shape({
    postalOperator: yup
        .string()
        .required('Required')
        .max(100, 'Post must be less than 100 characters'),
    postalDepartment: yup
        .string()
        .max(100, 'ukrPostDepart must be less than 100 characters'),
    courierAddress: yup
        .object()
        .shape({
            street: yup
                .string()
                .max(100, 'Street must be less than 100 characters')
                .matches(
                  /^(?!\s)[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ0-9\s]*$/,
                  'Street must contain only letters, numbers'
              ),
            house: yup
                .string()
                .max(10, 'House number must be less than 10 characters')
                .matches(
                  /^(?!\s)[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ0-9\s]*$/,
                  'House must contain only letters, numbers'
              ),
            apartment: yup
                .number()
                .label('Appartment')
                .typeError('The value must be a number')
                .positive('Appartment be a positive value')
                .integer(),
        })
        .nullable(),
});

export const PayMethodValidationsSchema = yup.object().shape({
    payMethod_id: yup.string().required('Required'),
});

export const PersonalContactInfoSchema = yup.object().shape({
    first_name: yup
        .string()
        .required('Required')
        .min(2, 'Name must be more than 2 characters')
        .max(60, 'Name must be less than 60 characters')
        .matches(
            /^[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ]+$/,
            'User Name, must be contain only letters'
        ),
    last_name: yup
        .string()
        .required('Required')
        .min(2, 'Surname must be more than 2 characters')
        .max(60, 'Surname must be less than 60 characters')
        .matches(
            /^[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ]+$/,
            'User Surname, must be contain only letters'
        ),
    phone_number: yup
        .string()
        .required('Required')
        .matches(
            /^[\+]{0,1}380/,
            'Number should start with code of Ukraine +380'
        )
        .matches(/^[\+]{0,1}380([0-9]{9})$/, 'And contain 9 numbers'),
    email: yup
        .string()
        .required('Required')
        .email()
        .min(2, 'Email must be more than 2 characters')
        .max(100, 'Email must be less than 100 characters')
        .matches(
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
            'User email, must be valid'
        ),
    b_day: yup
        .string()
        .nullable()
        // .notRequired()
        .matches(
            /^(\d{4})\-(\d{2})\-(\d{2})$/,
            'Дата народження повинна бути у форматі РРРР-ММ-ДД'
        ),
});

export const PersonalLoginInfoSchema = yup.object().shape({
    loginPhone: yup
        .string()
        .required('Required')
        .matches(
            /^[\+]{0,1}380/,
            'Number should start with code of Ukraine +380'
        )
        .matches(/^[\+]{0,1}380([0-9]{9})$/, 'And contain 9 numbers'),
});

export const HomeDeliveryAddressSchema = yup.object().shape({
    city: yup
        .string()
        .required('Required')
        .min(2, 'city must be more than 2 characters')
        .max(60, 'city must be less than 60 characters'),
    // .matches(
    //   /^[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ]+$/,
    //   "User city, must be contain only letters"
    // ),
    street: yup
        .string()
        .required('Required')
        .min(2, 'street must be more than 2 characters')
        .max(60, 'street must be less than 60 characters'),
    // .matches(
    //   /^[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ]+(?:\s[a-zA-Zа-щьюяіїґєА-ЩЬЮЯІЇҐЄ]+)*$/,
    //   "User street, must be contain only letters"
    // ),
    house: yup
        .string()
        .required('Required')
        .min(1, 'houseNumber must be more than 1 characters')
        .max(10, 'houseNumber must be less than 10 characters'),
    apartament: yup
        .number()
        .label('Appartment')
        .typeError('The value must be a number')
        // .positive("Appartment be a positive value")
        .integer()
        .nullable(),
});

export const NovaPostNDeliveryAddressSchema = yup.object().shape({
    city: yup
        .string()
        .required('Required')
        .min(2, 'city must be more than 2 characters')
        .max(60, 'city must be less than 60 characters'),
    novaPostDepart: yup
        .string()
        .required('Required')
        .min(2, 'street must be more than 2 characters')
        .max(100, 'street must be less than 60 characters'),
});

export const UkrPostNDeliveryAddressSchema = yup.object().shape({
    city: yup
        .string()
        .required('Required')
        .min(2, 'city must be more than 2 characters')
        .max(60, 'city must be less than 60 characters'),
    ukrPostDepart: yup
        .string()
        .required('Required')
        .min(2, 'street must be more than 2 characters')
        .max(100, 'street must be less than 60 characters'),
});
