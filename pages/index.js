import Card from "../components/Card.js";
import Api from "../components/Api.js";
import { search, output, saveSection } from "../utils/constants.js";

/* Добрый день, говорю сразу, проект не нуждается в проверке, я ничего не менял
1) Введя в поиск maxim, dima, qwe и добавив от каждого по 3 репозитория- в консоли не было ошибок
2) Как псих стучал по клаве вводя много букв- в консоли не было ошибок
3) У меня стоит настройка let dataArr = data.items.slice(0, 5), как в таком случае можеть быть
больше 5 элементов? Честно, пытался подобрать запрос- не смог
4) Для дебаунс всему увеличил

Прошу написать запросы, по которым я мог бы ловить ошибки и тестировать, а то у меня работает просто, спасибо
*/

/// API
const api = new Api({
  baseUrl: "https://api.github.com/search/repositories?q=Q",
});

/// create card function
function createNewCard(item) {
  const card = new Card(
    {
      data: item,
      handleClickDelete: (elem) => {
        elem.removeCard();
      },
      handleClickAddToSave: (elem) => {
        saveSection.append(elem);
        search.value = "";
        Array.from(output.children).forEach((el) => el.remove());
      },
    },
    "#tamlate-card"
  );

  const cardelement = card.generateCard();
  return cardelement;
}

/// sending a request to the server
function showSearchData(evt) {
  api.getInitialRepositories(evt.target.value).then((data) => {
    if (evt.target.value.length !== 0) {
      let dataArr = data.items.slice(0, 5);
      /// only first five

      dataArr.forEach((el) => {
        output.append(createNewCard(el));
      });
    }
  });
}

/// delay
const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

/// delay function with our time
const debouncedShowSearchData = debounce((evt) => {
  showSearchData(evt);
}, 350);

/// after user stop typing and after debouncedShowSearchData(aka debounce) send a request
search.addEventListener("input", (evt) => {
  let temp = evt.target.value.length;
  let old = "";
  /// change the results if new values
  if (evt.target.value.length == 0 || temp !== old) {
    Array.from(output.children).forEach((el) => el.remove());
  }
  old = temp;
  debouncedShowSearchData(evt);
});
