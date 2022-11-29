export class HashManagerMock {
  public async hash(plainText: string): Promise<string> {
    switch (plainText) {
      case "minha-senha-segura-bananinha123":
        return "$2a$12$2JRDDmbbCY2i0hTYq.WQjuCslvZ6e7DLuZX9YMx1EJhwawgp3MlXa";

      default:
        return "hash-mock";
    }
  }

  public compare = async (
    plainText: string,
    hash: string
  ): Promise<boolean> => {
    switch (plainText) {
      case "minha-senha-segura-bananinha123":
        return (
          hash ===
          "$2a$12$2JRDDmbbCY2i0hTYq.WQjuCslvZ6e7DLuZX9YMx1EJhwawgp3MlXa"
        );
      default:
        return false;
    }
  };
}
