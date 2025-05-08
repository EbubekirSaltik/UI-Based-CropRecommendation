import csv
import random

# Define headers
headers = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'label']

# Define crop parameter ranges from the document with modified names to avoid encoding issues
crop_types = {
    # Tahıllar
    "Bugday": {  # Changed from "Buğday"
        "N": (78, 116),
        "P": (42, 69),
        "K": (31, 53),
        "temperature": (16.5, 20.1),
        "humidity": (51.3, 59.2),
        "ph": (6.7, 7.6),
        "rainfall": (380, 425)
    },
    "Arpa": {
        "N": (70, 110),
        "P": (35, 65),
        "K": (29, 53),
        "temperature": (15.2, 18.4),
        "humidity": (46.5, 52.2),
        "ph": (7.0, 7.9),
        "rainfall": (315, 345)
    },
    "Misir": {  # Changed from "Mısır"
        "N": (65, 97),
        "P": (43, 61),
        "K": (18, 25),
        "temperature": (21.5, 26.3),
        "humidity": (63.5, 69.5),
        "ph": (6.0, 6.9),
        "rainfall": (450, 483)
    },
    "Cavdar": {  # Changed from "Çavdar"
        "N": (60, 90),
        "P": (30, 50),
        "K": (25, 45),
        "temperature": (14.0, 17.5),
        "humidity": (48.0, 55.0),
        "ph": (5.8, 7.0),
        "rainfall": (300, 350)
    },
    "Yulaf": {
        "N": (50, 85),
        "P": (30, 55),
        "K": (20, 40),
        "temperature": (15.0, 19.0),
        "humidity": (55.0, 65.0),
        "ph": (5.5, 7.5),
        "rainfall": (350, 450)
    },
    "Tritikale": {
        "N": (60, 100),
        "P": (35, 60),
        "K": (25, 50),
        "temperature": (15.0, 19.0),
        "humidity": (50.0, 60.0),
        "ph": (6.0, 7.5),
        "rainfall": (325, 400)
    },
    "Kaplica_Bugdayi": {  # Changed from "Kaplıca Buğdayı"
        "N": (40, 70),
        "P": (25, 45),
        "K": (20, 40),
        "temperature": (15.0, 18.0),
        "humidity": (48.0, 55.0),
        "ph": (6.5, 8.0),
        "rainfall": (300, 370)
    },
    
    # Baklagiller
    "Nohut": {
        "N": (25, 59),
        "P": (60, 80),
        "K": (75, 94),
        "temperature": (17.3, 21.5),
        "humidity": (15.3, 18.7),
        "ph": (7.2, 8.6),
        "rainfall": (365, 412)
    },
    "Kuru_Fasulye": {  # Changed from "Kuru Fasulye"
        "N": (4, 38),
        "P": (54, 79),
        "K": (15, 24),
        "temperature": (19.2, 22.9),
        "humidity": (21.2, 25.9),
        "ph": (5.5, 6.9),
        "rainfall": (460, 512)
    },
    "Mercimek": {
        "N": (20, 45),
        "P": (50, 75),
        "K": (40, 60),
        "temperature": (16.0, 20.0),
        "humidity": (25.0, 35.0),
        "ph": (6.5, 8.0),
        "rainfall": (320, 380)
    },
    "Bakla": {
        "N": (30, 50),
        "P": (45, 70),
        "K": (60, 90),
        "temperature": (18.0, 22.0),
        "humidity": (30.0, 45.0),
        "ph": (6.5, 7.8),
        "rainfall": (400, 450)
    },
    "Borulce": {  # Changed from "Börülce"
        "N": (15, 35),
        "P": (40, 60),
        "K": (30, 50),
        "temperature": (20.0, 25.0),
        "humidity": (40.0, 50.0),
        "ph": (6.0, 7.5),
        "rainfall": (350, 450)
    },
    
    # Endüstri Bitkileri
    "Seker_Pancari": {  # Changed from "Şeker Pancarı"
        "N": (100, 150),
        "P": (60, 90),
        "K": (80, 140),
        "temperature": (15.0, 20.0),
        "humidity": (60.0, 70.0),
        "ph": (6.5, 8.0),
        "rainfall": (500, 600)
    },
    "Tutun": {  # Changed from "Tütün"
        "N": (40, 60),
        "P": (30, 50),
        "K": (70, 120),
        "temperature": (18.0, 25.0),
        "humidity": (55.0, 65.0),
        "ph": (5.8, 6.5),
        "rainfall": (400, 500)
    },
    "Kenevir": {
        "N": (60, 100),
        "P": (40, 60),
        "K": (60, 90),
        "temperature": (17.0, 22.0),
        "humidity": (60.0, 70.0),
        "ph": (6.0, 7.5),
        "rainfall": (450, 550)
    },
    "Keten": {
        "N": (40, 70),
        "P": (35, 55),
        "K": (45, 75),
        "temperature": (16.0, 20.0),
        "humidity": (50.0, 60.0),
        "ph": (6.0, 7.0),
        "rainfall": (400, 500)
    },
    "Kendir": {
        "N": (80, 120),
        "P": (40, 70),
        "K": (60, 100),
        "temperature": (18.0, 25.0),
        "humidity": (55.0, 70.0),
        "ph": (6.0, 7.0),
        "rainfall": (400, 550)
    },
    
    # Yağlı Tohumlar
    "Aycicegi": {  # Changed from "Ayçiçeği"
        "N": (53, 97),
        "P": (36, 63),
        "K": (56, 83),
        "temperature": (21.2, 25.9),
        "humidity": (51.5, 59.8),
        "ph": (6.1, 7.5),
        "rainfall": (364, 411)
    },
    "Kolza": {
        "N": (60, 100),
        "P": (40, 60),
        "K": (50, 80),
        "temperature": (15.0, 20.0),
        "humidity": (50.0, 60.0),
        "ph": (6.0, 7.5),
        "rainfall": (350, 450)
    },
    "Aspir": {
        "N": (40, 70),
        "P": (30, 50),
        "K": (35, 60),
        "temperature": (20.0, 25.0),
        "humidity": (35.0, 45.0),
        "ph": (6.5, 8.0),
        "rainfall": (300, 400)
    },
    "Soya": {
        "N": (30, 60),
        "P": (40, 70),
        "K": (60, 90),
        "temperature": (20.0, 25.0),
        "humidity": (60.0, 70.0),
        "ph": (6.0, 7.0),
        "rainfall": (450, 700)
    },
    "Susam": {
        "N": (40, 60),
        "P": (35, 55),
        "K": (40, 70),
        "temperature": (22.0, 28.0),
        "humidity": (40.0, 50.0),
        "ph": (6.0, 7.5),
        "rainfall": (350, 450)
    },
    "Hashas": {  # Changed from "Haşhaş"
        "N": (50, 80),
        "P": (40, 60),
        "K": (35, 55),
        "temperature": (15.0, 20.0),
        "humidity": (50.0, 60.0),
        "ph": (6.5, 8.0),
        "rainfall": (350, 450)
    },
    
    # Yumrulu Bitkiler
    "Patates": {
        "N": (70, 110),
        "P": (46, 70),
        "K": (77, 112),
        "temperature": (16.3, 19.8),
        "humidity": (62.1, 67.4),
        "ph": (5.1, 6.5),
        "rainfall": (505, 547)
    },
    "Sogan": {  # Changed from "Soğan"
        "N": (60, 100),
        "P": (45, 70),
        "K": (70, 110),
        "temperature": (15.0, 20.0),
        "humidity": (55.0, 65.0),
        "ph": (6.0, 7.0),
        "rainfall": (350, 450)
    },
    "Sarimsak": {  # Changed from "Sarımsak"
        "N": (50, 90),
        "P": (40, 65),
        "K": (60, 100),
        "temperature": (13.0, 18.0),
        "humidity": (50.0, 60.0),
        "ph": (6.0, 7.5),
        "rainfall": (350, 450)
    },
    "Salgam": {  # Changed from "Şalgam"
        "N": (40, 70),
        "P": (30, 50),
        "K": (50, 80),
        "temperature": (15.0, 18.0),
        "humidity": (55.0, 65.0),
        "ph": (6.0, 7.0),
        "rainfall": (350, 450)
    },
    
    # Yem Bitkileri
    "Yonca": {
        "N": (20, 40),
        "P": (60, 90),
        "K": (70, 120),
        "temperature": (15.0, 25.0),
        "humidity": (45.0, 60.0),
        "ph": (6.5, 8.0),
        "rainfall": (400, 600)
    },
    "Korunga": {
        "N": (20, 40),
        "P": (50, 80),
        "K": (40, 70),
        "temperature": (14.0, 22.0),
        "humidity": (40.0, 50.0),
        "ph": (7.0, 8.5),
        "rainfall": (350, 450)
    },
    "Fig": {  # Changed from "Fiğ"
        "N": (20, 40),
        "P": (40, 60),
        "K": (30, 50),
        "temperature": (15.0, 20.0),
        "humidity": (45.0, 55.0),
        "ph": (6.0, 7.5),
        "rainfall": (350, 450)
    },
    "Silajlik_Misir": {  # Changed from "Silajlık Mısır"
        "N": (100, 150),
        "P": (50, 80),
        "K": (60, 100),
        "temperature": (20.0, 25.0),
        "humidity": (60.0, 70.0),
        "ph": (6.0, 7.0),
        "rainfall": (450, 550)
    },
    
    # Bahçe Bitkileri
    "Elma": {
        "N": (60, 100),
        "P": (30, 60),
        "K": (80, 140),
        "temperature": (14.0, 20.0),
        "humidity": (50.0, 65.0),
        "ph": (6.0, 7.0),
        "rainfall": (600, 800)
    },
    "Uzum": {  # Changed from "Üzüm"
        "N": (40, 80),
        "P": (30, 50),
        "K": (60, 120),
        "temperature": (16.0, 22.0),
        "humidity": (35.0, 45.0),
        "ph": (6.5, 7.5),
        "rainfall": (300, 500)
    },
    "Kiraz": {
        "N": (50, 90),
        "P": (25, 45),
        "K": (70, 120),
        "temperature": (15.0, 22.0),
        "humidity": (45.0, 60.0),
        "ph": (6.0, 7.5),
        "rainfall": (500, 700)
    },
    "Kayisi": {  # Changed from "Kayısı"
        "N": (45, 85),
        "P": (30, 50),
        "K": (65, 110),
        "temperature": (16.0, 22.0),
        "humidity": (40.0, 55.0),
        "ph": (6.5, 8.0),
        "rainfall": (400, 600)
    }
}

def generate_crop_data(crop_name, ranges, sample_count=80):
    """Belirtilen mahsul için, belirlenen aralıklarda örnek veriler üretir.
    
    Args:
        crop_name: Mahsul adı
        ranges: Her parametre için min-max değer aralıkları
        sample_count: Üretilecek örnek sayısı (varsayılan: 80)
    
    Returns:
        Üretilen veri örneklerinin listesi
    """
    data = []
    for _ in range(sample_count):
        # Rastgele değerler oluştur
        n = random.randint(ranges["N"][0], ranges["N"][1])
        p = random.randint(ranges["P"][0], ranges["P"][1])
        k = random.randint(ranges["K"][0], ranges["K"][1])
        
        # Ondalıklı değerler için 6 basamak hassasiyet
        temp = round(random.uniform(ranges["temperature"][0], ranges["temperature"][1]), 6)
        humidity = round(random.uniform(ranges["humidity"][0], ranges["humidity"][1]), 6)
        ph = round(random.uniform(ranges["ph"][0], ranges["ph"][1]), 6)
        rainfall = round(random.uniform(ranges["rainfall"][0], ranges["rainfall"][1]), 6)
        
        # Veriyi ekle
        data.append([n, p, k, temp, humidity, ph, rainfall, crop_name])
    
    return data

def main():
    # Tüm mahsuller için veri oluştur
    all_data = []
    for crop_name, ranges in crop_types.items():
        print(f"{crop_name} için 80 örnek oluşturuluyor...")
        crop_data = generate_crop_data(crop_name, ranges, 80)
        all_data.extend(crop_data)
    
    # Toplam veri sayısını hesapla
    total_samples = len(all_data)
    print(f"Toplam {total_samples} örnek oluşturuldu ({len(crop_types)} mahsul x 80 örnek).")
    
    # Verileri CSV dosyasına yaz
    output_file = 'Ic_Anadolu_35_Mahsul_Verileri_80x.csv'
    with open(output_file, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        writer.writerows(all_data)
    
    print(f"Veri seti başarıyla oluşturuldu ve '{output_file}' dosyasına kaydedildi.")

if __name__ == "__main__":
    main() 