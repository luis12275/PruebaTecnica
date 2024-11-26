import { withRouter } from 'react-router-dom'
import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import { Formik, Form, Field, FieldArray } from "formik";
import { useDispatch, useSelector } from 'react-redux'
import {
    TextField,
    Button,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    ListItemText,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import * as Yup from 'yup';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { agregarUsuario, obtenerEscolaridad, obtenerHabilidades, obtenerUsuarios } from '../redux/UsuriosDuck';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export const validationSchema = Yup.object().shape({
    curp: Yup.string()
        .required('El CURP es obligatorio')
        .matches(/^[A-Z0-9]{18}$/, 'CURP inválido'),
    nombre: Yup.string().required('El nombre es obligatorio'),
    direccion: Yup.string().required('La dirección es obligatoria'),
    fechaNacimiento: Yup.date().required('La fecha de nacimiento es obligatoria'),
    escolaridad: Yup.string().required('El nivel de escolaridad es obligatorio'),
    skills: Yup.array()
        .of(Yup.string().required('La habilidad no puede estar vacía'))
        .min(1, 'Agrega al menos una habilidad'),
    photo: Yup.mixed().required('Se requiere una foto'),
    correoElectronico: Yup.string()
        .email('Debe ser un correo electrónico válido') // Mensaje de error personalizado
        .required('El correo es obligatorio'),
});
function UsuariosComponent() {
    const dispatch = useDispatch()

    const escolaridad = useSelector(store => store.Usuario.escolaridad)
    const habilidades = useSelector(store => store.Usuario.habilidades)
    const usuarios = useSelector(store => store.Usuario.usuarios)

    console.log('habilidades ', habilidades)
    console.log('escolaridad ', escolaridad)
    console.log('usuarios ', usuarios)

    const columns = [
        { field: 'id', headerName: 'ID', headerAlign: 'center', flex: .2, sortable: false },
        { field: 'nombre', headerName: 'Nombre', headerAlign: 'center', flex: 1, sortable: false },
        { field: 'curp', headerName: 'Curp', headerAlign: 'center', flex: 1, sortable: false },
        { field: 'direccion', headerName: 'Dirección', headerAlign: 'center', flex: 1, sortable: false },
        { field: 'escolaridad', headerName: 'Escolaridad', headerAlign: 'center', flex: 1, sortable: false },
        { field: 'habilidades', headerName: 'Habilidades', headerAlign: 'center', flex: 1, sortable: false },
        /*{
            field: 'accion', headerName: 'Acción', headerAlign: 'center', flex: .5, sortable: false,
            renderCell: (params) =>
            (
                <div>
                    <button className={'btn btn-outline-success ms-1'}>✓</button>
                    <button className={'btn btn-outline-danger ms-2'}>X</button>
                </div>
            )
        },*/
    ]
    const rows = [];

    usuarios?.map(anexo => {
        rows.push({
            id: anexo.id, nombre: anexo.nombre, curp: anexo.curp, direccion: anexo.direccion,
            escolaridad: anexo.escolaridad.nivel, habilidades: anexo.usuario_habilidades?.map(item => item.habilidades.habilidad).join(', ')
        })

    })

    React.useEffect(() => {
        dispatch(obtenerEscolaridad())
        dispatch(obtenerHabilidades())
        dispatch(obtenerUsuarios())
    }, [])

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
        setOpenModal(true)

    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const initialValues = {
        nombre: "",
        curp: "",
        direccion: "",
        fechaNacimiento: "",
        correoElectronico: '',
        contrasena: "",
        escolaridad: "",
        skills: [],
        photo: null,
    };
    const onSubmit = async (values) => {
        values.listaHabilidades = habilidades
        console.log('los datos de envio es ', values)
        await dispatch(agregarUsuario(values))
        await dispatch(obtenerUsuarios())

    }


    const CustomField = ({ name, label, type = "text", ...props }) => (
        <Field
            name={name}
            as={TextField}
            label={label}
            fullWidth
            margin="normal"
            type={type}
            error={props.touched?.[name] && Boolean(props.errors?.[name])}
            helperText={props.touched?.[name] && props.errors?.[name]}
            {...props}
        />
    );
    const modalComponent = () => {
        return (
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-description">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                onSubmit(values);
                                handleCloseModal();
                            }}
                        >
                            {({ values, setFieldValue, errors, touched }) => (
                                <Form>
                                    <CustomField
                                        name="nombre"
                                        label="Nombre y Apellidos"
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <CustomField
                                        name="curp"
                                        label="CURP"
                                        errors={errors}
                                        touched={touched}
                                    />

                                    <CustomField
                                        name="direccion"
                                        label="Dirección"
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <CustomField
                                        name="correoElectronico"
                                        label="Correo"
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <CustomField
                                        name="contrasena"
                                        label="Contraseña"
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <CustomField
                                        name="fechaNacimiento"
                                        label="Fecha de Nacimiento"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        errors={errors}
                                        touched={touched}
                                    />

                                    {/* Select */}
                                    <Field
                                        name="escolaridad"
                                        as={TextField}
                                        label="Nivel de Escolaridad"
                                        select
                                        fullWidth
                                        margin="normal"
                                        error={
                                            touched.escolaridad && Boolean(errors.escolaridad)
                                        }
                                        helperText={touched.escolaridad && errors.escolaridad}
                                    >
                                        {escolaridad.map((level) => (
                                            <MenuItem key={level.id} value={level.id}>
                                                {level.nivel}
                                            </MenuItem>
                                        ))}
                                    </Field>

                                    {/* Habilidades */}
                                    <Field
                                        name="skills"
                                        as={TextField}
                                        select
                                        label="Habilidades"
                                        fullWidth
                                        margin="normal"
                                        SelectProps={{
                                            multiple: true,
                                            renderValue: (selected) => selected.join(", "),
                                        }}
                                        error={touched.skills && Boolean(errors.skills)}
                                        helperText={touched.skills && errors.skills}
                                    >
                                        {habilidades.map((skill) => (
                                            <MenuItem key={skill.id} value={skill.habilidad}>
                                                <Checkbox checked={values.skills.includes(skill.habilidad)} />
                                                <ListItemText primary={skill.habilidad} />
                                            </MenuItem>
                                        ))}
                                    </Field>

                                    {/* Fotografía */}
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Fotografía
                                    </Typography>

                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={(event) =>
                                            setFieldValue("photo", event.currentTarget.files[0])
                                        }
                                    />
                                    {errors.photo && touched.photo && (
                                        <Typography color="error">{errors.photo}</Typography>
                                    )}

                                    {/* Botones */}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            sx={{ mr: 1 }}
                                        >
                                            Continuar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={handleCloseModal}
                                        >
                                            Cancelar
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Typography>
                </Box>
            </Modal>
        )
    }

    return (
        <div className='row' style={{ marginTop: '2%' }}>
            <Button variant="outlined" className='row' style={{ display: 'block' }} onClick={() => handleOpenModal()}>Agregar Usuario</Button>
            <Box sx={{ height: 600, width: '100%', marginTop: '2%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                //checkboxSelection
                //disableRowSelectionOnClick
                />
            </Box>
            {modalComponent()}
        </div>
    )
}
export default withRouter(UsuariosComponent);