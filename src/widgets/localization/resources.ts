export const resources = {
  en: {
    translation: {
      //storybook examle
      errors: {
        unexpected_error: 'Unexpected error. We automatically register errors and will fix everything soon',
        'Failed to fetch': 'Connection error. Go to the server directory and start the server using the start script',
        is_required: 'Required field',
        invalid_email_address: 'Invalid email address',
        too_short_password: 'The password is too short',
        not_same_password: "Passwords don't match",
        ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect password or email',
        ERR_NOT_FOUND: 'An entity with this id was not found',
        ERR_USER_NOT_REGISTER: 'Register to access this feature',
        ERR_INCORRECT_PASSWORD: 'Invalid password',
        ERR_ACCOUNT_ALREADY_EXIST: 'An account with this email already exists',
        ERR_INVALID_PASSWORD: 'The password must contain at least 8 characters',
        ERR_INVALID_EMAIL: 'Invalid email',
        ERR_TOKEN_REQUIRED_ERROR:
          'Server token error. We automatically register all errors and will fix everything soon',
        ERR_AUTH_ERROR: 'You are not logged in, log in to your account and try again',
        ERR_DATA_BASE_ERROR: 'Database server error. We automatically register all errors and will fix everything soon',
        INTERNAL_SERVER_ERROR: 'Server error. We automatically register all errors and will fix everything soon',
        ERR_INVALID_NICKNAME:
          'The alias must be at least 7 characters and can contain only numbers, letters and an underscore',
        invalid_description: 'The description is too long',
        invalid_price: 'Invalid price',
        ERR_FAILED_LOAD_PRODUCTS: 'Unable to load products',
      },
      welcome: 'Welcome to my application!',
      description: 'This component demonstrates language switching.',
      close: 'Close',
      open: 'Open',
      widgets: {
        back: 'Back',
        save: 'Save',
        changeTheme: 'Change theme',
        selectSort: 'Select sorting',
        product: {
          card: 'Product card',
          cardDetailedTitle: 'Product description detailed',
          cost: 'Cost',
          name: 'Name',
          description: 'Description',
          category: 'Category',
          showMore: 'Show more',
          add: 'Add product',
          edit: 'Edit',
          photo: 'Link to image',
        },
        basket: {
          add: 'Add to basket',
        },
        authorization: {
          signIn: 'Sign in',
          profile: 'Profile',
          signUp: 'Sign up',
        },
        category: {
          card: 'Category card',
          name: 'Name',
          photo: 'Link to picture',
        },
        profile: {
          setting: 'Settings',
          orders: 'Orders',
        },
        orders: {
          no_orders: 'No orders',
          order_num: 'Order №',
          at: 'at',
          status: 'Status',
          success: 'Order success sended',
        },
      },
      screens: {
        main: 'Main',
        profile: {
          title: 'Profile',
          logout: 'Logout',
          updateProfile: {
            title: 'Change profile',
            success: 'Profile changed successfully',
            save: 'Save',
          },
          changePassword: {
            title: 'Change password',
            success: 'Password changed successfully',
            save: 'Change',
          },
        },
        auth: {
          authTitle: 'Authorization',
          title: 'Authentication',
          signIn: {
            title: 'Sign in',
            submit: 'Sign in',
          },
          signUp: {
            title: 'Sign out',
            submit: 'Sign out',
          },
        },
        basket: {
          title: 'Basket',
          total: 'Total',
          empty: 'No products',
          send_order: 'Send order',
        },
      },
      forms: {
        AuthForm: {
          email: {
            title: 'Email',
            placeholder: 'Enter email',
          },
          password: {
            title: 'Password',
            placeholder: 'Enter password',
          },
        },
        ChangePasswordForm: {
          password: {
            title: 'Password',
            placeholder: 'Enter password',
          },
          newPassword: {
            title: 'New password',
            placeholder: 'Enter new password',
          },
          repeatPassword: {
            title: 'Repeat password',
            placeholder: 'Repeat password',
          },
        },
        EmailForm: {
          email: {
            title: 'Email',
            placeholder: 'Enter email',
          },
        },
        ProfileForm: {
          name: {
            title: 'Nickname',
            placeholder: 'Come up with a pseudonym for yourself',
          },
          about: {
            title: 'About',
            placeholder: 'Write something about yourself',
          },
        },
        RepeatPasswordForm: {
          password: {
            title: 'Password',
            placeholder: 'Enter password',
          },
          repeatPassword: {
            title: 'Repeat password',
            placeholder: 'Repeat password',
          },
        },
      },
    },
  },
  ru: {
    translation: {
      //storybook examle
      welcome: 'Добро пожаловать в моё приложение!',
      description: 'Этот компонент демонстрирует переключение языка.',
      close: 'Закрыть',
      open: 'Открыть',
      errors: {
        unexpected_error: 'Неожиданная ошибка. Мы автоматически регистрируем ошибки и скоро все исправим',
        'Failed to fetch':
          'Ошибка соединения. Перейдите в директорию server и запустите сервер с помощью скрипта start',
        is_required: 'Обязательное поле',
        invalid_email_address: 'Некорректный email адрес',
        too_short_password: 'Слишком короткий пароль',
        not_same_password: 'Пароли не совпадают',
        ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Некорректный пароль или email',
        ERR_NOT_FOUND: 'Сущность с таким id не найдена',
        ERR_USER_NOT_REGISTER: 'Зарегистрируйтесь, чтобы получить доступ к этой функции',
        ERR_INCORRECT_PASSWORD: 'Некорректный пароль',
        ERR_ACCOUNT_ALREADY_EXIST: 'Аккаунт с таким email уже существует',
        ERR_INVALID_PASSWORD: 'Пароль должен содержать от 8 символов',
        ERR_INVALID_EMAIL: 'Некорректный email',
        ERR_TOKEN_REQUIRED_ERROR:
          'Серверная ошибка токена. Мы автоматически регистрируем все ошибки и скоро все исправим',
        ERR_AUTH_ERROR: 'Вы не авторизованы, войдите в учетную запись и повторите попытку',
        ERR_DATA_BASE_ERROR:
          'Серверная ошибка базы данный. Мы автоматически регистрируем все ошибки и скоро все исправим',
        INTERNAL_SERVER_ERROR: 'Серверная ошибка. Мы автоматически регистрируем все ошибки и скоро все исправим',
        ERR_INVALID_NICKNAME:
          'Псевдоним должен быть от 7 символов и может содержать только числа, буквы и символ нижнего подчеркивания',
        invalid_description: 'Описание слишком длинное',
        invalid_price: 'Некорректная стоимость',
        ERR_FAILED_LOAD_PRODUCTS: 'Не удалось загрузить продукты',
      },
      widgets: {
        back: 'Назад',
        save: 'Сохранить',
        changeTheme: 'Сменить тему',
        selectSort: 'Выберите сортировку',
        product: {
          card: 'Карточка товара',
          cardDetailedTitle: 'Подробное описание товара',
          cost: 'Стоимость',
          name: 'Название',
          description: 'Описание',
          category: 'Категория',
          showMore: 'Показать еще',
          add: 'Добавить продукт',
          edit: 'Редактировать',
          photo: 'Ссылка на картинку',
        },
        basket: {
          add: 'В корзину',
        },
        authorization: {
          signIn: 'Авторизоваться',
          profile: 'Профиль',
          signUp: 'Регистрация',
        },
        category: {
          card: 'Карточка категории',
          name: 'Название',
          photo: 'Ссылка на картинку',
        },
        profile: {
          setting: 'Настройки',
          orders: 'Заказы',
        },
        orders: {
          no_orders: 'Нет заказов',
          order_num: 'Заказ №',
          at: 'от',
          status: 'Статус',
          success: 'Заказ успешно отправлен',
        },
      },
      screens: {
        main: 'Главная',
        profile: {
          title: 'Профиль',
          logout: 'Выйти',
          updateProfile: {
            title: 'Изменить профиль',
            success: 'Профиль успешно изменен',
            save: 'Сохранить',
          },
          changePassword: {
            title: 'Изменить пароль',
            success: 'Пароль успешно изменен',
            save: 'Изменить',
          },
        },
        auth: {
          authTitle: 'Авторизация',
          title: 'Аутентификация',
          signIn: {
            title: 'Войти',
            submit: 'Войти',
          },
          signUp: {
            title: 'Зарегистрироваться',
            submit: 'Зарегистрироваться',
          },
        },
        basket: {
          title: 'Корзина',
          total: 'Итого',
          empty: 'Нет товаров',
          send_order: 'Отправить заказ',
        },
      },
      forms: {
        AuthForm: {
          email: {
            title: 'Email',
            placeholder: 'Укажите email',
          },
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
        },
        ChangePasswordForm: {
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
          newPassword: {
            title: 'Новый пароль',
            placeholder: 'Укажите новый пароль',
          },
          repeatPassword: {
            title: 'Повторите пароль',
            placeholder: 'Повторите пароль',
          },
        },
        EmailForm: {
          email: {
            title: 'Email',
            placeholder: 'Укажите email',
          },
        },
        ProfileForm: {
          name: {
            title: 'Псевдоним',
            placeholder: 'Придумайте себе псевдоним',
          },
          about: {
            title: 'О себе',
            placeholder: 'Напишите что-нибудь о себе',
          },
        },
        RepeatPasswordForm: {
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
          repeatPassword: {
            title: 'Повторите пароль',
            placeholder: 'Повторите пароль',
          },
        },
      },
    },
  },
};
