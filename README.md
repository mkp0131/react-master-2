# 리액트 마스터 2

## React Hook Form

- https://react-hook-form.com/

### 장점

- form, input 의 onchange(), onsubmit() 이벤트를 손쉽게 걸 수 있다.
- 🧤🧤🧤 validate가 손쉽게 가능하며, 에러가 생긴 input 으로 자동으로 focus 가 이동한다.
- 사용자가 형식에 맞게 값을 입력하면 에러 메세지(formState.errors)가 자동으로 사라진다.

### 사용법

- useForm() 함수 실행으로 사용할 여가지 값들을 불러옴.

```js
import { useForm } from 'react-hook-form';

function App() {
  const {
    register, // onChange 이벤트를 가지고있음.
    handleSubmit, // submit 시 사용
    formState: { errors }, // 에러 데이터
    setError, // 강제로 에러를 발생시킬때 사용
  } = useForm<IForm>();
}
```

- register() 함수를 이용하여 input 에 세팅

```js
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
// 에러메세지 출력될 곳도 생성
<span>{errors?.password1?.message}</span>
```

- handleSubmit(콜백함수) 함수를 onSubmit 이벤트에 건다.

```js
// onSubmit 시 validate 할 함수
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

<form onSubmit={handleSubmit(onSubmit)}></form>;
```

- watch() 의 경우 register 가 변경될때마다 모든 정보를 return 한다.
