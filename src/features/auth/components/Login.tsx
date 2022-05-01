import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import '../Auth.css';
import { LoginRequest } from '../authModel';
import { authActions, selectAuthLoading } from '../authSlice';

const Login = () => {
  const loading = useAppSelector(selectAuthLoading);
  const dispatch = useAppDispatch();

  const validation = yup.object().shape({
    username: yup
      .string()
      .required('Tên không được để trống')
      .matches(/^[a-zA-Z0-9]*$/, 'Tên chỉ chứa ký tự số và chữ')
      .min(4, 'Tên dài từ 4 đến 20 ký tự')
      .max(20, 'Tên dài từ 4 đến 20 ký tự'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống')
      .min(4, 'Mật khẩu dài từ 4 đến 20 ký tự')
      .max(20, 'Mật khẩu dài từ 4 đến 20 ký tự')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    mode: 'onTouched',
    resolver: yupResolver(validation)
  });

  const onSubmit = (request: LoginRequest) => {
    dispatch(authActions.loginBegin(request));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': {
            width: {
              xs: '30ch',
              sm: '35ch',
              md: '40ch',
              lg: '45ch',
              xl: '50ch'
            }
          }
        }}
      >
        <Typography
          style={{ textAlign: 'center' }}
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Đăng nhập
        </Typography>
        <TextField
          error={errors.username ? true : false}
          label="Tên"
          variant="outlined"
          margin="normal"
          id={errors.username && `outlined-error-helper-text`}
          helperText={errors.username && errors.username?.message}
          {...register('username')}
        />
        <TextField
          error={errors.password ? true : false}
          label="Mật khẩu"
          variant="outlined"
          type={'password'}
          margin="normal"
          id={errors.password && `outlined-error-helper-text`}
          helperText={errors.password && errors.password?.message}
          {...register('password')}
        />
        <LoadingButton
          size="medium"
          loading={loading}
          variant="contained"
          style={{ marginTop: '16px' }}
          type="submit"
          color="primary"
          disabled={loading ? true : false}
        >
          Đăng nhập
        </LoadingButton>
        <span style={{ marginTop: '16px', textAlign: 'center' }}>
          <Link to="/auth/register" className="text-navigate">
            Tạo tài khoản?
          </Link>
        </span>
      </Box>
    </form>
  );
};

export default Login;
