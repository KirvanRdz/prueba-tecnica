
const UserFactory = require('../models/userFactory');
const User = require('../models/user');

jest.mock('../models/user'); // Mocks para la clase User

describe('UserFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test('debe crear un usuario para la versión 1', async () => {
    const data = { nombre: 'John', apellido: 'Doe', correo: 'john@example.com', contraseña: '123456' };
    const mockSave = jest.fn().mockResolvedValue(data);
    User.mockImplementation(() => ({
      save: mockSave,
    }));

    const result = await UserFactory.createUser('v1', data);
    expect(result).toEqual(data);
    expect(mockSave).toHaveBeenCalled(); // Verifica que se llamó a save
  });

  test('debe crear un usuario para la versión 2', async () => {
    const data = { nombre: 'Jane', apellido: 'Doe', correo: 'jane@example.com', contraseña: 'abcdef', edad: 30, fecha_nacimiento: '1994-01-01' };
    const mockSave = jest.fn().mockResolvedValue(data);
    User.mockImplementation(() => ({
      save: mockSave,
    }));

    const result = await UserFactory.createUser('v2', data);
    expect(result).toEqual(data);
    expect(mockSave).toHaveBeenCalled(); // Verifica que se llamó a save
  });

  test('debe lanzar un error si la versión no es soportada', async () => {
    await expect(UserFactory.createUser('v3', {})).rejects.toThrow('Versión no soportada');
  });

  test('debe actualizar un usuario para la versión 1', async () => {
    const id = 1;
    const data = { nombre: 'John', apellido: 'Doe', correo: 'john@example.com', contraseña: '123456' };
    const mockUpdateById = jest.fn().mockResolvedValue(data);
    User.mockImplementation(() => ({
      updateById: mockUpdateById,
      id,
    }));

    const result = await UserFactory.updateUser('v1', id, data);
    expect(result).toEqual(data);
    expect(mockUpdateById).toHaveBeenCalled(); // Verifica que se llamó a updateById
  });

  test('debe lanzar un error si la versión no es soportada para actualizar', async () => {
    await expect(UserFactory.updateUser('v3', 1, {})).rejects.toThrow('Versión no soportada');
  });

  test('debe obtener un usuario por ID', async () => {
    const id = 1;
    const mockUser = { id, nombre: 'John', apellido: 'Doe', correo: 'john@example.com', contraseña: '123456' };
    const mockFindById = jest.fn().mockResolvedValue(mockUser);
    User.findById = mockFindById; // Mockea el método findById de User

    const result = await User.findById(id);
    expect(result).toEqual(mockUser);
    expect(mockFindById).toHaveBeenCalledWith(id); // Verifica que se llamó a findById con el ID correcto
  });

  test('debe eliminar un usuario por ID', async () => {
    const id = 1;
    const mockDeletedUser = { id, nombre: 'John', apellido: 'Doe', correo: 'john@example.com' };
    const mockDeleteById = jest.fn().mockResolvedValue(mockDeletedUser);
    User.deleteById = mockDeleteById; // Mockea el método deleteById de User

    const result = await User.deleteById(id);
    expect(result).toEqual(mockDeletedUser);
    expect(mockDeleteById).toHaveBeenCalledWith(id); // Verifica que se llamó a deleteById con el ID correcto
  });
});
