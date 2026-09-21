from app.database import SessionLocal
from app.models import Product

products_data = [
    {
        'title': 'Apple iPhone 13 Pro Max 256 ГБ',
        'price': 49999,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/13815862/hat4b62e18159314066a49f3f454d69a92b/orig',
        'category': 'Смартфоны',
        'description': '📸 Флагман с потрясающей камерой, чипом A15 Bionic и плавным дисплеем 120 Гц.'
    },
    {
        'title': 'Apple Watch Series 9',
        'price': 32990,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/14303028/hat9394b3b71e976b3aca559329d1f972e9/orig',
        'category': 'Умные часы',
        'description': '⌚ Яркий всегда активный дисплей, датчик температуры и управление жестом Double Tap.'
    },
    {
        'title': 'Sony PlayStation 5 Slim Digital',
        'price': 54999,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/14767629/hat776ae2da20abbe73a263d0019c0397e8/orig',
        'category': 'Игровые консоли',
        'description': '🎮 Компактная версия хита с SSD на 1 ТБ. Молниеносная загрузка.'
    },
    {
        'title': 'Apple iPad 10 64GB Silver',
        'price': 39999,
        'image_url': 'https://img.mvideo.ru/product-medias/photos/4253334/94ddcfa6-11d6-4e43-a5b2-893055a500c0.jpg?width=600&fmt=avif',
        'category': 'Планшеты',
        'description': '📱 Универсальный планшет для работы и развлечений. Дисплей Liquid Retina.'
    },
    {
        'title': 'Apple AirPods Pro 2',
        'price': 19990,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/13815862/hat4b62e18159314066a49f3f454d69a92b/orig',
        'category': 'Наушники',
        'description': '🎧 Премиальные наушники с активным шумоподавлением и пространственным аудио.'
    },
    {
        'title': 'MacBook Air 15 M2',
        'price': 129990,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/14303028/hat9394b3b71e976b3aca559329d1f972e9/orig',
        'category': 'Ноутбуки',
        'description': '💻 Тонкий и мощный ноутбук с чипом M2 и до 18 часов работы.'
    },
    {
        'title': 'Samsung Galaxy S24 Ultra 256GB',
        'price': 89990,
        'image_url': 'https://img.mvideo.ru/product-medias/photos/4253334/94ddcfa6-11d6-4e43-a5b2-893055a500c0.jpg?width=600&fmt=avif',
        'category': 'Смартфоны',
        'description': '📱 Флагман с S Pen, 200 МП камерой и ИИ-функциями. Титановый корпус.'
    },
    {
        'title': 'Sony WH-1000XM5',
        'price': 29990,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/14767629/hat776ae2da20abbe73a263d0019c0397e8/orig',
        'category': 'Наушники',
        'description': '🎧 Лучшие беспроводные наушники с шумоподавлением. 30 часов автономности.'
    },
    {
        'title': 'Apple Magic Keyboard',
        'price': 12990,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/13815862/hat4b62e18159314066a49f3f454d69a92b/orig',
        'category': 'Аксессуары',
        'description': '⌨️ Беспроводная клавиатура с цифровым блоком. Идеальна для Mac.'
    },
    {
        'title': 'Nintendo Switch OLED',
        'price': 29990,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/14303028/hat9394b3b71e976b3aca559329d1f972e9/orig',
        'category': 'Игровые консоли',
        'description': '🎮 Портативная консоль с ярким 7-дюймовым OLED-экраном.'
    },
    {
        'title': 'Apple Watch SE 2',
        'price': 24990,
        'image_url': 'https://img.mvideo.ru/product-medias/photos/4253334/94ddcfa6-11d6-4e43-a5b2-893055a500c0.jpg?width=600&fmt=avif',
        'category': 'Умные часы',
        'description': '⌚ Доступные умные часы с отслеживанием фитнеса и уведомлениями.'
    },
    {
        'title': 'JBL Charge 5',
        'price': 12990,
        'image_url': 'https://avatars.mds.yandex.net/get-goods_pic/14767629/hat776ae2da20abbe73a263d0019c0397e8/orig',
        'category': 'Акустика',
        'description': '🔊 Портативная колонка с мощным басом, защитой IP67 и powerbank-функцией.'
    }
]


def seed_db():
    db = SessionLocal()

    try:
        added = 0
        for item in products_data:
            if not db.query(Product).filter(Product.title == item['title']).first():
                product = Product(**item)
                db.add(product)
                added += 1

        db.commit()

        if added:
            print(f'Успешно добавлено {added} новых товаров в базу!')
        else:
            print('Новых товаров не найдено, база уже актуальна.')
    except Exception as e:
        print(f'Ошибка при добавлении: {e}')
        db.rollback()
    finally:
        db.close()


if __name__ == '__main__':
    seed_db()