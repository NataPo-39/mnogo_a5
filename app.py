from flask import Flask, jsonify, send_from_directory
import json

app = Flask(__name__, static_folder='public', static_url_path='')

# Данные анонсов (динамика)
news_items = [
    {
        "title": "Концерт группы «Калининград Блюз» в Доме искусств",
        "date": "10.05.2026",
        "rubric": "Календарь событий",
        "preview": "Выступление приглашённых музыкантов из Санкт-Петербурга. Начало в 19:00."
    },
    {
        "title": "Выставка «Калининград сквозь века» в Музее изобразительных искусств",
        "date": "12.05.2026",
        "rubric": "Экспозиции",
        "preview": "Уникальные гравюры и карты региона XVIII–XX веков."
    },
    {
        "title": "Майский номер: «Городские выходные»",
        "date": "01.05.2026",
        "rubric": "Тема номера",
        "preview": "Гид по паркам, кафе и веломаршрутам Калининграда."
    }
]

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/news')
def get_news():
    return jsonify(news_items)

@app.route('/health')
def health():
    return jsonify(status='ok'), 200

# Для статических файлов CSS, JS, изображений
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('public', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)