class PusatDataSingleton:
    _instance = None

    def __init__(self):
        if not hasattr(self, 'DataTersimpan'):
            self.DataTersimpan = []

    @staticmethod
    def GetDataSingleton():
        if PusatDataSingleton._instance is None:
            PusatDataSingleton._instance = PusatDataSingleton()
        return PusatDataSingleton._instance

    def GetSemuaData(self):
        return self.DataTersimpan

    def PrintSemuaData(self):
        for data in self.DataTersimpan:
            print(data)

    def AddSebuahData(self, input):
        self.DataTersimpan.append(input)

    def HapusSebuahData(self, index):
        if 0 <= index < len(self.DataTersimpan):
            del self.DataTersimpan[index]

if __name__ == "__main__":
    # A. Buat dua variabel singleton
    data1 = PusatDataSingleton.GetDataSingleton()
    data2 = PusatDataSingleton.GetDataSingleton()

    # B. Tambah data ke data1
    data1.AddSebuahData("Aldo")
    data1.AddSebuahData("Nadya")
    data1.AddSebuahData("Sultan")
    data1.AddSebuahData("Asisten: Aulia")

    # C. Print dari data2
    print("Data dari data2 sebelum penghapusan:")
    data2.PrintSemuaData()

    # D. Hapus asisten dari data2
    index_asisten = data2.GetSemuaData().index("Asisten: Aulia")
    data2.HapusSebuahData(index_asisten)

    # E. Print dari data1
    print("\nData dari data1 setelah penghapusan asisten:")
    data1.PrintSemuaData()

    # F. Hitung jumlah data
    print("\nJumlah data dalam data1:", len(data1.GetSemuaData()))
    print("Jumlah data dalam data2:", len(data2.GetSemuaData()))
