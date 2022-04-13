import React from 'react';
import { useForm } from 'react-hook-form';

interface IForm {
  email: string;
  displayName: string;
  password: string;
  password1: string;
  extraError?: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    if (data.password !== data.password1) {
      console.log('틀림');
      setError(
        'password1',
        { message: '패스워드가 일치하지 않습니다.' },
        { shouldFocus: true }
      );
    }
    // 전체 에러 (서버 다운 등등을 처리하면됨)
    // setError("extraError", { message: "Server offline." });
  };

  return (
    <div className="App">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span>{errors?.extraError?.message}</span>
        <input
          type="text"
          placeholder="Email"
          {...register('email', {
            required: '이메일을 입력해주세요.', // true 가 아닌 에러메세지 넣을 수 있다.
            pattern: {
              value: /^\S+@\S+$/i,
              message: '이메일 형식을 확인해주세요.',
            },
          })}
        />
        <span>{errors?.email?.message}</span>
        <input
          type="text"
          placeholder="닉네임"
          maxLength={6}
          {...register('displayName', {
            required: '닉네임을 입력해주세요.', // true 가 아닌 에러메세지 넣을 수 있다.
            minLength: { value: 3, message: '닉네임은 3글자 이상 입니다.' },
            maxLength: { value: 6, message: '닉네임은 6글자 이하 입니다.' },
          })}
        />
        <span>{errors?.displayName?.message}</span>
        <input
          type="password"
          placeholder="패스워드"
          {...register('password', {
            required: '패스워드를 입력해주세요.', // true 가 아닌 에러메세지 넣을 수 있다.
            minLength: { value: 6, message: '패스워드는 6글자 이상 입니다.' },
            maxLength: { value: 12, message: '패스워드는 12글자 이하 입니다.' },
          })}
        />
        <span>{errors?.password?.message}</span>
        <input
          type="password"
          placeholder="패스워드 확인"
          {...register('password1', {
            required: '패스워드를 재입력해주세요.', // true 가 아닌 에러메세지 넣을 수 있다.
            minLength: { value: 6, message: '패스워드는 6글자 이상 입니다.' },
            maxLength: { value: 12, message: '패스워드는 12글자 이하 입니다.' },
          })}
        />
        <span>{errors?.password1?.message}</span>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default App;
