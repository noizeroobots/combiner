# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

----------------------------------------------------------------------------------------------------------------
КАК ЗАПУСТИТЬ ПРОЕКТ.
1) Создать БД с параметрами подключения:
    user: "postgres",
    host: "localhost",
    database: "trader-db",
    password: "12345",
    port: 5432,

2) Создать в БД таблицы:
    - candles
    - fractals
    - fvg


create table if not exists candles
(
    id                      integer unique     not null primary key generated always as identity,
    time                    varchar(50),
    high                    numeric(10, 3),
    low                     numeric(10, 3),
    open                    numeric(10, 3),
    close                   numeric(10, 3),
    volume                  numeric(10, 3),
    is_complete             boolean,
    is_calculated           boolean,
    ticker                  varchar(50)
);

create table if not exists fvg
(
    id                      integer unique     not null primary key generated always as identity,
    ticker                  varchar(10),
    time                    varchar(50),
    fvg_high                numeric(10, 3),
    fvg_low                 numeric(10, 3),
    fvg_middle              numeric(10, 3),
    log_message             varchar(250)
);

create table if not exists fractals
(
    id                      integer unique     not null primary key generated always as identity,
    ticker                  varchar(10),
    time                    varchar(50),
    extreme                 numeric(10, 3),
    log_message             varchar(250)
);

3) Открыть Visual Studio Code

4) Открыть 2 терминала и ввести команды:
    start app: npm run dev
    start server: node server.mjs

5) Открыть браузер и перейти по ссылке, которую покажет команда npm run dev (e.x. http://localhost:5173/)
----------------------------------------------------------------------------------------------------------------

PGTime:
27-06-2024 22-02 finished the second lesson https://www.youtube.com/watch?v=v3pp0K8x2eY&list=PL-FhWbGlJPfaCm9Qx7G9wQqtt2_yBT92V&index=9

прочитать про v-bind, v-if и v-for


В Apache ECharts есть следующие функции для отображения различных типов элементов на графике:

    MarkPoint: Используется для отображения меток на графике, которые могут быть настроены для отображения различных типов данных, таких как максимумы и минимумы.
    MarkLine: Используется для отображения линий на графике, которые могут быть настроены для отображения различных типов данных, таких как максимумы и минимумы.
    MarkArea: Используется для отображения прямоугольников на графике, которые могут быть настроены для отображения различных типов данных, таких как области интереса.
    Line: Используется для отображения линий на графике, которые могут быть настроены для отображения различных типов данных, таких как линии тренда.
    Rect: Используется для отображения прямоугольников на графике, которые могут быть настроены для отображения различных типов данных, таких как области интереса.
    Polygon: Используется для отображения многоугольников на графике, которые могут быть настроены для отображения различных типов данных, таких как области интереса.
    Circle: Используется для отображения кругов на графике, которые могут быть настроены для отображения различных типов данных, таких как области интереса.
    Ellipse: Используется для отображения эллипсов на графике, которые могут быть настроены для отображения различных типов данных, таких как области интереса.
    Ring: Используется для отображения кольцевых диаграмм на графике, которые могут быть настроены для отображения различных типов данных, таких как области интереса.
    Arc: Используется для отображения дуг на графике, которые могут быть настроены для отображения различных типов данных, таких как области интереса.

Эти функции могут быть настроены для создания различных типов графиков и отображения данных в различных форматах.
