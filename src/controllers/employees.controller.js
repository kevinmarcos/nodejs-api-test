import { pool } from '../db.js'

export const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ocurrio mal'
        })
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from employee where id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const createEmpoyee = async (req, res) => {
    const { name, salary } = req.body
    const [rows] = await pool.query('insert into employee (name, salary) values (?,?)', [name, salary])

    try {
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}
export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body

    try {
        const [result] = await pool.query('update employee set name = IFNULL(?,name), salary = IFNULL(?,salary) where id = ?', [name, salary, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        })

        const [rows] = await pool.query('select * from employee where id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const [result] = await pool.query('delete from employee where id = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}