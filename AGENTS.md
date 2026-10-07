# Общие правила проекта LISS

- Сайт — статические HTML, CSS и JavaScript. Не добавляй фреймворк или шаг сборки без отдельного решения владельца.
- Для локального просмотра из корня сайта запусти `python3 -m http.server 8123 --bind 127.0.0.1` и открой `http://localhost:8123`.
- Перед визуальными изменениями изучи `assets/site.css`; используй существующие CSS-переменные палитры. Основной синий бренда — `#012E89`.
- Не создавай ИИ-сгенерированных людей, фото команды, вымышленных клиентов, референсных объектов, отзывов или неподтверждённых обещаний.
- `docs/` содержит внутренние материалы и ведётся отдельным локальным Git-репозиторием. Не копируй его содержимое в публичный сайт или Git-репозиторий сайта. Для внутренних задач смотри `docs/INDEX.md`, `docs/Dorozhnaya-karta.md` и `docs/LISS-Masterdokument.md`; соблюдай пометки о конфиденциальности в самих документах.
- У локального репозитория `docs/` не должно быть удалённого адреса. Не добавляй remote, не отправляй внутренние материалы в сеть и не включай их в коммиты родительского репозитория без отдельного прямого разрешения владельца.
- Локальные изменения можно готовить по запросу владельца. Не публикуй изменения сайта: push в `main`, слияние в `main` и запуск публикации требуют явного «да» владельца.
- Не запускай `docs/launch/launch.py --apply`, пока владелец не подтвердит выполнение блокеров из `docs/Startklar-Auftrag.md` и не попросит применить запуск.
- Работаем по очереди в одной папке. Перед началом читай `docs/SESSION.md`, в конце обнови блок «Последняя передача». Законченную задачу фиксируй отдельным коммитом (внутренние файлы — в git внутри `docs/`).
- Индикатор «чей ход» (владелец смотрит на `http://localhost:8123/docs/status.html`). В начале любой работы: `python3 docs/status.py claude "задача"` (или `codex`). В конце, перед ответом владельцу: `python3 docs/status.py owner "задача" "что владельцу сделать" --an codex|claude --text "фраза, которую владелец перешлёт другому"`. Без этого владелец не знает, кому отвечать.
- Каждый ответ владельцу заканчивай блоком «➡️ Дальше»: кто работает или кому отвечать, и одна фраза для пересылки.
- Weitere vertrauliche Regeln des Inhabers stehen in `docs/SESSION.md` (Abschnitt «Правила, которые легко нарушить»). Vor jeder Arbeit lesen; nicht in öffentliche Dateien übernehmen.
- Wenn der Inhaber eine Aufgabe an einen anderen Assistenten weiterleiten soll, immer die nötige Modellstufe angeben: `--stufe leicht|mittel|stark --warum "Grund"` bei `docs/status.py` (leicht = einfache Prüfung/Formulierung, mittel = Code und Szenarientests, stark = Berechnungen, Sicherheit, Recht, Architektur).
- Zusammenarbeit von Claude Code und Codex: `docs/ARBEITSVOLLMACHT.md` (grün/gelb/rot, Streitregel, Schutzgrenzen) gilt. Vor jeder Arbeit lesen.
