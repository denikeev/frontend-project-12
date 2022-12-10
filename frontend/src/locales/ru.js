export default {
  ru: {
    translation: {
      loginPage: {
        title: 'Войти',
        invalidAuth: 'Неверные имя пользователя или пароль',
        loginBtn: 'Войти',
        noAccount: 'Нет аккаунта?',
        usernameLabel: 'Ваш ник',
        passwordLabel: 'Пароль',
      },
      signUpPage: {
        validation: {
          required: 'Обязательное поле',
          usernameMinMax: 'От 3 до 20 символов',
          passwordMin: 'Не менее 6 символов',
          passwordsMustMatch: 'Пароли должны совпадать',
        },
        title: 'Регистрация',
        confirmPassLabel: 'Подтвердите пароль',
        userExist: 'Такой пользователь существует',
        signUp: 'Зарегистрироваться',
        usernameLabel: 'Имя пользователя',
      },
      noMatchPage: {
        title: 'Страница не найдена',
        404: '404',
        switch: 'Перейти на',
        toMainPage: 'главную страницу',
      },
      chat: {
        messageForm: {
          messagePlaceholder: 'Введите сообщение...',
          ariaLabel: 'Новое сообщение',
        },
        channels: 'Каналы',
        deleteChannel: 'Удалить',
        renameChannel: 'Переименовать',
        addChannelLabel: '+',
        channelSettings: 'Управление каналом',
      },
      header: {
        logotype: 'Hexlet Chat',
        logout: 'Выйти',
      },
      modals: {
        uniqName: 'Имя должно быть уникальным',
        addChannel: 'Добавить канал',
        cancel: 'Отменить',
        submit: 'Отправить',
        deleteChannel: 'Удалить канал',
        confirm: 'Уверены?',
        delete: 'Удалить',
        renameChannel: 'Переименовать канал',
        labelChannelName: 'Имя канала',
      },
      notifications: {
        networkWarn: 'Ошибка соединения',
        addChannel: 'Канал создан',
        deleteChannel: 'Канал удалён',
        renameChannel: 'Канал переименован',
        authorizationErr: 'Ошибка авторизации',
      },
      messagesCount: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
  },
};
