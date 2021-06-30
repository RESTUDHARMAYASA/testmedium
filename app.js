function login(e) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    fetch('http://localhost:3000/api/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(res => res.json())
        .then(data => {
            data ? window.location = "showdata.html" : alert("Email atau password salah!");
        })
}

function tambah(e) {
    e.preventDefault();
    const nama = document.querySelector('#nama').value;
    const nim = document.querySelector('#nim').value;
    const fakultas = document.querySelector('#fakultas').value;
    const jabatan = document.querySelector('#jabatan').value;

    fetch('http://localhost:3000/api/anggota', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nama: nama,
            nim: nim,
            fakultas: fakultas,
            jabatan: jabatan,
        })
    })
        .then(res => res.json())
        .then(data => {
            data ? window.location = "showdata.html" : alert("Data gagal ditambahkan!");
        })
}

function edit(e, id) {
    e.preventDefault();
    const nama = document.querySelector(`#nama${id}`).value;
    const nim = document.querySelector(`#nim${id}`).value;
    const fakultas = document.querySelector(`#fakultas${id}`).value;
    const jabatan = document.querySelector(`#jabatan${id}`).value;
    fetch('http://localhost:3000/api/anggota/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nama: nama,
            nim: nim,
            fakultas: fakultas,
            jabatan: jabatan,
        })
    })
        .then(res => res.json())
        .then(data => {
            data ? window.location = "showdata.html" : alert("Data gagal diperbaharui!");
        })
}

function hapus(e, id) {
    e.preventDefault();
    fetch('http://localhost:3000/api/anggota/' + id, {
        method: 'delete',
    })
        .then(res => res.json())
        .then(data => {
            data ? window.location = "showdata.html" : alert("Data gagal diperbaharui!");
        })
}

function tampil() {
    const tabel = document.querySelector('#tampil-data');
    const modals = document.querySelector('#modals');
    let newTabel = "";
    let newModal = "";

    fetch('http://localhost:3000/api/anggota')
        .then(res => res.json())
        .then(data => {
            data.forEach(data => {
                newTabel += `
                    <tr>
                        <th scope="row">${data.Fakultas}</th>
                        <td>${data.Nama}</td>
                        <td>${data.NIM}</td>
                        <td>${data.Jabatan}</td>
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit${data._id}">Edit</button>
                            <button type="button" onclick="hapus(event, '${data._id}')" class="btn btn-danger">Hapus</button>
                        </td>
                    </tr>
                `;
                newModal += `
                <div class="modal fade" id="edit${data._id}" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
                    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="editLabel">Edit</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row" onsubmit="edit(event, '${data._id}')">
                                <div class="col-md-12 mb-2">
                                <label for="fakultas" class="form-label">Fakultas</label>
                                <input type="text" class="form-control" id="fakultas${data._id}" placeholder="masukkan fakultas" value=${data.Fakultas}>
                                </div>
                                <div class="col-12 mb-4">
                                <label for="nama" class="form-label">Nama</label>
                                <input type="text" class="form-control" id="nama${data._id}" placeholder="masukkan nama" value=${data.Nama}>
                                </div>
                                <div class="col-12 mb-4">
                                    <label for="nim" class="form-label">NIM</label>
                                    <input type="text" class="form-control" id="nim${data._id}" placeholder="masukkan nim" value=${data.NIM}>
                                </div>
                                <div class="col-12 mb-4">
                                    <label for="jabatan" class="form-label">Jabatan</label>
                                    <input type="text" class="form-control" id="jabatan${data._id}" placeholder="masukkan jabatan" value=${data.Jabatan}>
                                </div>
                                <div class="col-12">
                                <button type="submit" class="btn btn-success">Edit</button>
                                <button data-bs-dismiss="modal" class="btn btn-danger">Kembali</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
                `;
            });
            tabel.innerHTML = newTabel;
            modals.innerHTML = newModal;
        })
}