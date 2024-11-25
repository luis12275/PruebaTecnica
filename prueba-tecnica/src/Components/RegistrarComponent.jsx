import React from "react";
import { useHistory } from "react-router-dom";  // Usar useHistory en lugar de useNavigate
import { Formik, Field, Form, ErrorMessage } from "formik";

const LoginComponent = (props) => {
  const history = useHistory();  // Usar useHistory aquí

  const handleLogin = (values) => {
    const { email, password } = values;

    if (email === "admin@example.com" && password === "password") {
      props.history.push("/Usuarios");  // Usar history.push en lugar de navigate()
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El correo electrónico no es válido";
    }

    if (!values.password) {
      errors.password = "La contraseña es requerida";
    } else if (values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validate}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese su email"
              />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label htmlFor="password">Contraseña:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
              />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginComponent;
