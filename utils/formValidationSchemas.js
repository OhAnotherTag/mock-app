import * as yup from 'yup'

let Login = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().email()
});

// const required = { required: 'This Field is Required' };
// const maxLength = {
//   maxLength: {
//     value: 50,
//     message: "This Field exceed it's max length of 50",
//   },
// };

const ValidationSchema = {
  Login,
}

export default ValidationSchema
