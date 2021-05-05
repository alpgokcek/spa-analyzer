import React from 'react'

export const API_URL = 'https://spa-analyzer-api.herokuapp.com/api/'
export const STORAGE_URL = 'https://spa-analyzer-api.herokuapp.com/storage'

export const BASE_PATH = "/"

export const ROLES = {
    ADMIN: '1',
    RECTOR: '2',
    DEAN: '3',
    HEAD_OF_DEPARTMENT: '4',
    INSTRUCTOR: '5',
    STUDENT: '6'
}

export const FILE_TYPES = {
    SPA: 'spa',
    GAT: 'gat'
}

export const FILE_UPLOAD = {
    SPA_FILE: 'https://spa-analyzer-flask.herokuapp.com/file-upload',
    SPA_FILE_DELETE: 'https://spa-analyzer-flask.herokuapp.com/file-remove',
    STS_FILE:'/sts/uploadedFile',
    SECTIONS_FILE:'/section/uploadedFile',
    IGS_FILE: '/igs/uploadedFile',
    COURSE_FILE: '/course/uploadedFile',
    PO_FILE: '/program-outcome/uploadedFile',
    USER_FILE: '/user/uploadedFile'
}

export const LEVEL_TO_ROLE = {
    1: 'Admin',
    2: 'Rektör',
    3: 'Dekan',
    4: 'Bölüm Başkanı',
    5: 'Öğretim Görevlisi',
    6: 'Öğrenci'
}
const caretStyle = (order, column) => {
    if (!order) return (<span>&nbsp;&nbsp;<i className="fas fa-sort"/></span>);
    else if (order === 'asc') return (<span>&nbsp;&nbsp;<i className="fas fa-sort-up"/></span>);
    else if (order === 'desc') return (<span>&nbsp;&nbsp;<i className="fas fa-sort-down"/></span>);
    return null;
}
export const USERS = {
    list: {
        pageName: "Kullanıcılar",
        cardHeader: "Kullanıcılar",
        new: "Yeni Kullanıcı",
        import: "İçeri Aktar",
        columns: [
            {
                dataField: 'name',
                text: 'Adı Soyadı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'departmentName',
                text: 'Departman',
                align: 'center',
                headerAlign: 'center',
                classes: 'hide-column-on-mobile',
                headerClasses:'hide-column-on-mobile',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'studentID',
                text: 'Öğrenci Numarası',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'level',
                text: 'Rolü',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false
            }
        ]
    },
    edit:{
        pageName: "Kullanıcı İşlemleri",
        editCardHeader: "Kullanıcı Düzenle",
        createCardHeader: "Kullanıcı Yarat",
        formFields:{
            name: "Adı:",
            student_id: "Öğrenci No:",
            university: "Üniversite:",
            email: "Email Adresi:",
            faculty_id: "Fakülte:",
            department_id: "Departman:",
            roles: "Roller:"
        },
        sendButton: {
            edit: "Kullanıcıyı Güncelle",
            new: "Davet Gönder"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Kullanıcı bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const ASSESSMENTS = {
    list: {
        pageName: "Değerlendirmeler",
        cardHeader: "Değerlendirmeler",
        new: "Yeni Değerlendirme",
        columns: [
            {
                dataField: 'name',
                text: 'Değerlendirme Adı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'courseName',
                text: 'Ders Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'percentage',
                text: 'Yüzdesi',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "Değerlendirme İşlemleri",
        editCardHeader: "Değerlendirme Düzenle",
        createCardHeader: "Değerlendirme Yarat",
        formFields:{
            course: "Ders:",
            name: "Değerlendirme Adı:",
            percentage:"Yüzdesi:"
        },
        sendButton: {
            edit: "Değerlendirme Güncelle",
            new: "Değerlendirme Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Değerlendirme bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const GRADING_TOOLS = {
    list: {
        pageName: "Değerlendirme Araçları",
        cardHeader: "Değerlendirme Araçları",
        new: "Yeni Değerlendirme Aracı",
        columns: [
            {
                dataField: 'question_number',
                text: 'Değerlendirme Aracı Adı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'courseName',
                text: 'Ders Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'assessmentName',
                text: 'Değerlendirme Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'percentage',
                text: 'Yüzdesi',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "Değerlendirme İşlemleri",
        editCardHeader: "Değerlendirme Düzenle",
        createCardHeader: "Değerlendirme Yarat",
        formFields:{
            assessment: "Değerlendirme:",
            name: "Değerlendirme Aracı Adı:",
            percentage:"Yüzdesi:"
        },
        sendButton: {
            edit: "Değerlendirme Aracını Güncelle",
            new: "Değerlendirme Aracı Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Değerlendirme aracı bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

const spaDefaultForm = {
    section:'', 
    department:'', 
    year_and_term:'', 
    type:'', 
    code:'',
    name:'', 
    credit:'',
    file: {}
}

export const UPLOAD_FILE_PAGE = {
    edit:{
        pageName: "Dosya Yükleme İşlemleri",
        editCardHeader: "Dosya Yükleme",
        createCardHeader: "Dosya Yükleme",
        formFields:{
            file: "Dosya Yükle:",
            section:'Ders Grubu:', 
            department:'Departman:', 
            year_and_term: 'Yıl ve Dönem:', 
            type:'Dosya Türü:', 
            code:'Ders Kodu:',
            name:'Ders Adı:', 
            credit:'Ders Kredisi:'
        },
        sendButton: {
            new: "Dosyayı Yükle"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Dosyayı yüklemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const COURSES = {
    list: {
        pageName: "Dersler",
        cardHeader: "Dersler",
        new: "Yeni Ders",
        import: "İçeri Aktar",
        columns: [
            {
                dataField: 'code',
                text: 'Ders Kodu',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'title',
                text: 'Ders Adı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'departmentName',
                text: 'Departman Adı',
                align: 'center',
                headerAlign: 'center',
                classes: 'hide-column-on-mobile',
                headerClasses:'hide-column-on-mobile',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'year_and_term',
                text: 'Yılı ve Dönemi',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'credit',
                text: 'Kredi',
                align: 'center',
                headerAlign: 'center',
                classes: 'hide-column-on-mobile',
                headerClasses:'hide-column-on-mobile',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "Ders İşlemleri",
        editCardHeader: "Ders Düzenle",
        createCardHeader: "Ders Yarat",
        formFields:{
            department: "Departman:",
            code: "Ders Kodu:",
            year_and_term:"Yıl ve Dönem:",
            credit:"Kredi",
            name: "Ders Adı:",
            status: "Ders Durumu:"
        },
        sendButton: {
            edit: "Dersi Güncelle",
            new: "Dersi Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Ders bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const COURSE_OUTCOMES = {
    list: {
        pageName: "Ders Çıktıları",
        cardHeader: "Ders Çıktıları",
        new: "Yeni Ders Çıktısı",
        columns: [
            {
                dataField: 'code',
                text: 'Ders Çıktısı Kodu',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'courseName',
                text: 'Ders Adı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'explanation',
                text: 'Açıklaması',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'measured_average',
                text: 'Hesaplanan Ortalama',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'survey_average',
                text: 'Anket Ortalaması',
                align: 'center',
                headerAlign: 'center',
                classes: 'hide-column-on-mobile',
                headerClasses:'hide-column-on-mobile',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "Ders Çıktısı İşlemleri",
        editCardHeader: "Ders Çıktısı Düzenle",
        createCardHeader: "Ders Çıktısı Yarat",
        formFields:{
            course: "Ders:",
            code: "Ders Çıktısı Kodu:",
            survey_average:"Anket Ortalaması",
            measured_average: "Hesaplanan Ortalama:",
            explanation: "Ders Çıktısı Açıklaması:",
            popco: "Program Çıktıları:"
        },
        sendButton: {
            edit: "Ders Çıktısını Güncelle",
            new: "Ders Çıktısını Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Departman bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const PROGRAM_OUTCOMES = {
    list: {
        pageName: "Öğrenci Çıktıları",
        cardHeader: "Öğrenci Çıktıları",
        new: "Yeni Öğrenci Çıktısı",
        columns: [
            {
                dataField: 'code',
                text: 'Öğrenci Çıktısı Kodu',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'courseName',
                text: 'Ders Adı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'explanation',
                text: 'Açıklaması',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'year_and_term',
                text: 'Yılı ve Dönemi',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "Öğrenci Çıktısı İşlemleri",
        editCardHeader: "Öğrenci Çıktısı Düzenle",
        createCardHeader: "Öğrenci Çıktısı Yarat",
        formFields:{
            program: "Departman:",
            code: "Öğrenci Çıktısı Kodu:",
            year_and_term:"Yıl ve Dönem:",
            explanation: "Öğrenci Çıktısı Açıklaması:"
        },
        sendButton: {
            edit: "Öğrenci Çıktısını Güncelle",
            new: "Öğrenci Çıktısını Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Öğrenci çıktısı bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const STUDENTS_TAKE_SECTIONS = {
    list: {
        pageName: "Öğrencilerin Sectionları",
        cardHeader: "Öğrencilerin Sectionları",
        new: "Yeni Ekle",
        import: "İçeri Aktar",
        columns: [
            {
                dataField: 'section_title',
                text: 'Grup Adı',
                classes: 'hide-column-on-mobile',
                headerClasses:'hide-column-on-mobile',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'student_id',
                text: 'Öğrenci Numarası',
                classes: 'hide-column-on-mobile',
                headerClasses:'hide-column-on-mobile',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'user_name',
                text: 'Öğrenci Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'course_name',
                text: 'Ders Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'letter_grade',
                text: 'Harf Notu',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'average',
                text: 'Ortalama',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "STS İşlemleri",
        editCardHeader: "STS Düzenle",
        createCardHeader: "STS Yarat",
        formFields:{
            department: "Departman:",
            section: "Grup:",
            student: "Öğrenci:",
            course: "Ders:",
            average: "Ortalama:",
            letter_grade: "Harf Notu:"
        },
        sendButton: {
            edit: "Güncelle",
            new: "Yeni Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Öğrenci çıktısı bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}


export const PO_PROVIDE_CO = {
    list: {
        pageName: "POPCO",
        cardHeader: "POPCO",
        new: "Yeni Ekle",
        columns: [
            {
                dataField: 'co_code',
                text: 'Ders Çıktısı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'po_code',
                text: 'Program Çıktısı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "POPCO İşlemleri",
        editCardHeader: "POPCO Düzenle",
        createCardHeader: "POPCO Yarat",
        formFields:{
            department: "Departman:",
            courseOutcome: "Ders Çıktısı:",
            programOutcome: "Program Çıktısı:",
            course: "Ders:"
        },
        sendButton: {
            edit: "Güncelle",
            new: "Yeni Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'POPCO bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const GT_COVER_CO = {
    list: {
        pageName: "GTCCO",
        cardHeader: "GTCCO",
        new: "Yeni Ekle",
        columns: [
            {
                dataField: 'co_code',
                text: 'Ders Çıktısı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'name',
                text: 'Değerlendirme Aracı Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "GTCCO İşlemleri",
        editCardHeader: "GTCCO Düzenle",
        createCardHeader: "GTCCO Yarat",
        formFields:{
            courseOutcome: "Ders Çıktısı:",
            gradingTool: "Değerlendirme Aracı:",
            course: "Ders:"
        },
        sendButton: {
            edit: "Güncelle",
            new: "Yeni Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'GTCCO bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const STUDENTS_ANSWER_GT = {
    list: {
        pageName: "SAGT",
        cardHeader: "SAGT",
        new: "Yeni Ekle",
        columns: [
            {
                dataField: 'name',
                text: 'Ders',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'year_and_term',
                text: 'Yıl ve Dönem',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'grading_tool',
                text: 'Değerlendirme Aracı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'user_name',
                text: 'Öğrenci Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'grade',
                text: 'Not',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "SAGT İşlemleri",
        editCardHeader: "SAGT Düzenle",
        createCardHeader: "SAGT Yarat",
        formFields:{
            department: "Departman:",
            student: "Öğrenci:",
            assessment: "Değerlendirme:",
            gradingTool: "Değerlendirme Aracı:",
            grade: "Not:"
        },
        sendButton: {
            edit: "Güncelle",
            new: "Yeni Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'SAGT bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}


export const INSTRUCTORS_GIVE_SECTIONS = {
    list: {
        pageName: "Öğretim Görevlilerinin Sectionları",
        cardHeader: "Öğretim Görevlilerinin Sectionları",
        new: "Yeni Ekle",
        import: "İçeri Aktar",
        columns: [
            {
                dataField: 'section_title',
                text: 'Grup Adı',
                classes: 'hide-column-on-mobile',
                headerClasses:'hide-column-on-mobile',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'course_name',
                text: 'Ders Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'user_name',
                text: 'Öğretim Görevlisi Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "IGS İşlemleri",
        editCardHeader: "IGS Düzenle",
        createCardHeader: "IGS Yarat",
        formFields:{
            department: "Departman:",
            section: "Grup:",
            instructor: "Öğretim Görevlisi:",
            course: "Ders:"
        },
        sendButton: {
            edit: "Güncelle",
            new: "Yeni Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Öğretim Görevlilerinin Sectionları bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}


export const DEPARTMENTS = {
    list: {
        pageName: "Departmanlar",
        cardHeader: "Departmanlar",
        new: "Yeni Departman",
        columns: [
            {
                dataField: 'name',
                text: 'Departman Adı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'facultyName',
                text: 'Fakülte',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'status',
                text: 'Durum',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "Departman İşlemleri",
        editCardHeader: "Departman Düzenle",
        createCardHeader: "Departman Yarat",
        formFields:{
            faculty: "Fakülte:",
            name: "Departman Adı:",
            status: "Departman Durumu:"
        },
        sendButton: {
            edit: "Departmanı Güncelle",
            new: "Departmanı Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Departman bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}
export const FACULTIES = {
    list: {
        pageName: "Fakülteler",
        cardHeader: "Fakülteler",
        new: "Yeni Fakülte",
        columns: [
            {
                dataField: 'title',
                text: 'Fakülte Adı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'universityName',
                text: 'Üniversite Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'status',
                text: 'Durum',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "Fakülte İşlemleri",
        editCardHeader: "Fakülte Düzenle",
        createCardHeader: "Fakülte Yarat",
        formFields:{
            university: "Üniversite:",
            name: "Fakülte Adı:",
            status: "Fakülte Durumu:"
        },
        sendButton: {
            edit: "Fakülteyi Güncelle",
            new: "Fakülteyi Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Fakülte bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const SECTIONS = {
    list: {
        pageName: "Ders Grupları",
        cardHeader: "Ders Grupları",
        new: "Yeni Ders Grubu",
        import: "İçeri Aktar",
        columns: [
            {
                dataField: 'title',
                text: 'Ders Grubu Adı',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'courseName',
                text: 'Ders Adı',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: 'status',
                text: 'Durum',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            },
            {
                dataField: '_actions',
                text: 'Aksiyonlar',
                align: 'center',
                headerAlign: 'center',
                sort: false,
                sortCaret: caretStyle
            }
        ]
    },
    edit:{
        pageName: "Ders Grubu İşlemleri",
        editCardHeader: "Ders Grubu Düzenle",
        createCardHeader: "Ders Grubu Yarat",
        formFields:{
            name: "Ders Grubu Adı:",
            status: "Ders Grubu Durumu:",
            course: "Ders:",
            is_file_uploaded: "Dosya Durumu:"
        },
        sendButton: {
            edit: "Ders Grubunu Güncelle",
            new: "Ders Grubunu Yarat"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Ders grubunun bilgilerini güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        }
    }
}

export const PROFILE = {
    edit:{
        pageName: "Profilim",
        editCardHeader: "Profili Düzenle",
        formFields:{
            name: "Adı:",
            surname: "Soyadı:",
            phone: "Telefon No:",
            address: "Adres:",
            email: "Email Adresi:",
            tckn: "TCKN:",
            resetPassword: "Şifre Sıfırlama:"
        },
        actionButtons: {
            update: "Profili Güncelle",
            resetPassword: "Şifreyi Değiştir"
        }
    },
    modals: {
        edit: {
            title: 'Onay',
            body: 'Profil bilgilerinizi güncellemek istediğinize emin misiniz?',
            actionButton: 'Evet',
            cancelButton: 'Hayır'
        },
        forgotPassword: {
            title: 'Şifre Güncelleme',
            actionButton: 'Güncelle',
            cancelButton: 'İptal'
        }
    }
}

export const RESET_PASSWORD = {
    cardHeader: {
        setPassword: 'Sisteme erişim için şifrenizi oluşturun.',
        resetPassword: 'Şifrenizi sıfırlamak için email adresinizi girin.'
    },
    actionButtons: {
        setPassword: 'Gönder',
        resetPassword: 'Gönder'
    }
}

export const LOGIN_PAGE = {
    header: 'Devam etmek için giriş yapın.',
    forgotPassword: 'Şifrenizi mi unuttunuz?',
    loginButton: 'Giriş Yap'
}

export const ERROR_MESSAGES = {
    profileUpdate: 'Kullanıcı bilgilerinizi güncellemek istiyorsanız lütfen n11 ile iletişime geçin.',
    unsaved: 'Yapmış olduğunuz değişiklikler kaydedilmeyecektir. Ekrandan ayrılmak istediğinize emin misiniz?',
    required: 'Bu alan zorunludur.',
    valid: 'Lütfen alana geçerli bir bilgi giriniz.',
    email: 'Doğru bir email adresi giriniz.',
    tckn: 'Lütfen doğru bir TC Kimlik numarası giriniz',
    phone: 'Lütfen telefon numarasını başında 0 olmadan 10 hane olacak şekilde giriniz.',
    at_least_one: 'En az 1 tane seçilmelidir.',
    equalto: 'Şifreler birbiriyle aynı olmalıdır.',
    lengthRange: (minVal, maxVal) => `Bu alanın uzunluğu ${minVal}-${maxVal} arasında olmalıdır.`,
    minLength: minVal => `Bu alanın uzunluğu en az ${minVal} karakter olmalıdır.`,
    maxLength: maxVal => `Bu alanın uzunluğu en fazla ${maxVal} karakter olmalıdır.`,
    fixedLength: val => `Bu alanın uzunluğu ${val} karakter olmalıdır.`,
}

export const STATUS = {
    WAITING_FOR_N11_APPROVAL:'WAITING_FOR_N11_APPROVAL',
    WAITING_FOR_AUTHORITY_UPLOAD:'WAITING_FOR_AUTHORITY_UPLOAD',
    WAITING_FOR_AUTHORITY_APPROVAL:'WAITING_FOR_AUTHORITY_APPROVAL',
    AUTHORITY_REJECTED_BY_COUNSELOR: 'AUTHORITY_REJECTED_BY_COUNSELOR',
    AUTHORITY_APPROVED:'AUTHORITY_APPROVED',
    ON_DELIVERY: 'ON_DELIVERY',
    DELIVERY_COMPLETED: 'DELIVERY_COMPLETED'
}

export const ACTIVE = 1
export const PASSIVE = 0

export const PENDING = "_PENDING"
export const FULFILLED = "_FULFILLED"
export const REJECTED = "_REJECTED"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export const PASSWORD_FORGOT = "PASSWORD_FORGOT"
export const PASSWORD_RESET = "PASSWORD_RESET"
export const PASSWORD_SET = "PASSWORD_SET"

export const UPLOAD_FILE = "UPLOAD_FILE"
export const CLEAR_FILE = "CLEAR_FILE"

export const CLEAR_ASSESSMENT = "CLEAR_ASSESSMENT"
export const GET_ASSESSMENT = "GET_ASSESSMENT"
export const GET_ALL_ACTIVE_ASSESSMENTS = "GET_ALL_ACTIVE_ASSESSMENTS"
export const GET_ALL_ASSESSMENTS = "GET_ALL_ASSESSMENTS"
export const CREATE_ASSESSMENT = "CREATE_ASSESSMENT"
export const UPDATE_ASSESSMENT = "UPDATE_ASSESSMENT"
export const DELETE_ASSESSMENT = "DELETE_ASSESSMENT"

export const CLEAR_FACULTY = "CLEAR_FACULTY"
export const GET_FACULTY = "GET_FACULTY"
export const GET_ALL_ACTIVE_FACULTIES = "GET_ALL_ACTIVE_FACULTIES"
export const GET_ALL_FACULTIES = "GET_ALL_FACULTIES"
export const CREATE_FACULTY = "CREATE_FACULTY"
export const UPDATE_FACULTY = "UPDATE_FACULTY"
export const DELETE_FACULTY = "DELETE_FACULTY"

export const CLEAR_SECTION = "CLEAR_SECTION"
export const GET_SECTION = "GET_SECTION"
export const GET_ALL_ACTIVE_SECTIONS = "GET_ALL_ACTIVE_SECTIONS"
export const GET_ALL_SECTIONS = "GET_ALL_SECTIONS"
export const CREATE_SECTION = "CREATE_SECTION"
export const UPDATE_SECTION = "UPDATE_SECTION"
export const DELETE_SECTION = "DELETE_SECTION"

export const CLEAR_COURSE_OUTCOME = "CLEAR_COURSE_OUTCOME"
export const GET_COURSE_OUTCOME = "GET_COURSE_OUTCOME"
export const GET_ALL_ACTIVE_COURSE_OUTCOMES = "GET_ALL_ACTIVE_COURSE_OUTCOMES"
export const GET_ALL_COURSE_OUTCOMES = "GET_ALL_COURSE_OUTCOMES"
export const CREATE_COURSE_OUTCOME = "CREATE_COURSE_OUTCOME"
export const UPDATE_COURSE_OUTCOME = "UPDATE_COURSE_OUTCOME"
export const DELETE_COURSE_OUTCOME = "DELETE_COURSE_OUTCOME"

export const CLEAR_COURSE = "CLEAR_COURSE"
export const GET_COURSE = "GET_COURSE"
export const GET_ALL_ACTIVE_COURSES = "GET_ALL_ACTIVE_COURSES"
export const GET_ALL_COURSES = "GET_ALL_COURSES"
export const CREATE_COURSE = "CREATE_COURSE"
export const UPDATE_COURSE = "UPDATE_COURSE"
export const DELETE_COURSE = "DELETE_COURSE"

export const CLEAR_DEPARTMENT = "CLEAR_DEPARTMENT"
export const GET_DEPARTMENT = "GET_DEPARTMENT"
export const GET_ALL_ACTIVE_DEPARTMENTS = "GET_ALL_ACTIVE_DEPARTMENTS"
export const GET_ALL_DEPARTMENTS = "GET_ALL_DEPARTMENTS"
export const CREATE_DEPARTMENT = "CREATE_DEPARTMENT"
export const UPDATE_DEPARTMENT = "UPDATE_DEPARTMENT"
export const DELETE_DEPARTMENT = "DELETE_DEPARTMENT"

export const CLEAR_GRADING_TOOL = "CLEAR_GRADING_TOOL"
export const GET_GRADING_TOOL = "GET_GRADING_TOOL"
export const GET_ALL_ACTIVE_GRADING_TOOLS = "GET_ALL_ACTIVE_GRADING_TOOLS"
export const GET_ALL_GRADING_TOOLS = "GET_ALL_GRADING_TOOLS"
export const CREATE_GRADING_TOOL = "CREATE_GRADING_TOOL"
export const UPDATE_GRADING_TOOL = "UPDATE_GRADING_TOOL"
export const DELETE_GRADING_TOOL = "DELETE_GRADING_TOOL"

export const CLEAR_STUDENTS_TAKE_SECTIONS = "CLEAR_STUDENTS_TAKE_SECTIONS"
export const GET_STUDENTS_TAKE_SECTIONS = "GET_STUDENTS_TAKE_SECTIONS"
export const GET_ALL_ACTIVE_STUDENTS_TAKE_SECTIONS = "GET_ALL_ACTIVE_STUDENTS_TAKE_SECTIONS"
export const GET_ALL_STUDENTS_TAKE_SECTIONS = "GET_ALL_STUDENTS_TAKE_SECTIONS"
export const CREATE_STUDENTS_TAKE_SECTIONS = "CREATE_STUDENTS_TAKE_SECTIONS"
export const UPDATE_STUDENTS_TAKE_SECTIONS = "UPDATE_STUDENTS_TAKE_SECTIONS"
export const DELETE_STUDENTS_TAKE_SECTIONS = "DELETE_STUDENTS_TAKE_SECTIONS"

export const CLEAR_INSTRUCTORS_GIVE_SECTIONS = "CLEAR_INSTRUCTORS_GIVE_SECTIONS"
export const GET_INSTRUCTORS_GIVE_SECTIONS = "GET_INSTRUCTORS_GIVE_SECTIONS"
export const GET_ALL_ACTIVE_INSTRUCTORS_GIVE_SECTIONS = "GET_ALL_ACTIVE_INSTRUCTORS_GIVE_SECTIONS"
export const GET_ALL_INSTRUCTORS_GIVE_SECTIONS = "GET_ALL_INSTRUCTORS_GIVE_SECTIONS"
export const CREATE_INSTRUCTORS_GIVE_SECTIONS = "CREATE_INSTRUCTORS_GIVE_SECTIONS"
export const UPDATE_INSTRUCTORS_GIVE_SECTIONS = "UPDATE_INSTRUCTORS_GIVE_SECTIONS"
export const DELETE_INSTRUCTORS_GIVE_SECTIONS = "DELETE_INSTRUCTORS_GIVE_SECTIONS"

export const CLEAR_PROGRAM_OUTCOME = "CLEAR_PROGRAM_OUTCOME"
export const GET_PROGRAM_OUTCOME = "GET_PROGRAM_OUTCOME"
export const GET_ALL_ACTIVE_PROGRAM_OUTCOMES = "GET_ALL_ACTIVE_PROGRAM_OUTCOMES"
export const GET_ALL_PROGRAM_OUTCOMES = "GET_ALL_PROGRAM_OUTCOMES"
export const CREATE_PROGRAM_OUTCOME = "CREATE_PROGRAM_OUTCOME"
export const UPDATE_PROGRAM_OUTCOME = "UPDATE_PROGRAM_OUTCOME"
export const DELETE_PROGRAM_OUTCOME = "DELETE_COURSE_OUTCOME"

export const CLEAR_UNIVERSITY = "CLEAR_UNIVERSITY"
export const GET_UNIVERSITY = "GET_UNIVERSITY"
export const GET_ALL_ACTIVE_UNIVERSITIES = "GET_ALL_ACTIVE_UNIVERSITIES"
export const GET_ALL_UNIVERSITIES = "GET_ALL_UNIVERSITIES"
export const CREATE_UNIVERSITY = "CREATE_UNIVERSITY"
export const UPDATE_UNIVERSITY = "UPDATE_UNIVERSITY"
export const DELETE_UNIVERSITY = "DELETE_UNIVERSITY"

export const CLEAR_USER = "CLEAR_USER"
export const CREATE_USER = "CREATE_USER"
export const UPDATE_USER = "UPDATE_USER"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ALL_USERS_BY_COMPANY = "GET_ALL_USERS_BY_COMPANY"
export const GET_USER = "GET_USER"
export const DELETE_USER = "DELETE_USER"

export const GET_ALL_POPCO = "GET_ALL_POPCO"
export const GET_POPCO = "GET_POPCO"
export const CREATE_POPCO = "CREATE_POPCO"
export const DELETE_POPCO = "DELETE_POPCO"
export const UPDATE_POPCO = "UPDATE_POPCO"
export const CLEAR_POPCO = "CLEAR_POPCO"

export const GET_ALL_GTCCO = "GET_ALL_GTCCO"
export const GET_GTCCO = "GET_GTCCO"
export const CREATE_GTCCO = "CREATE_GTCCO"
export const DELETE_GTCCO = "DELETE_GTCCO"
export const UPDATE_GTCCO = "UPDATE_GTCCO"
export const CLEAR_GTCCO = "CLEAR_GTCCO"

export const GET_ALL_SAGT = "GET_ALL_SAGT"
export const GET_SAGT = "GET_SAGT"
export const CREATE_SAGT = "CREATE_SAGT"
export const DELETE_SAGT = "DELETE_SAGT"
export const UPDATE_SAGT = "UPDATE_SAGT"
export const CLEAR_SAGT = "CLEAR_SAGT"

export const GET_PROFILE = "GET_PROFILE"
export const UPDATE_PROFILE = "UPDATE_PROFILE"

export const RESET = "RESET"
export const DEFINE = "DEFINE"

const errorWordMapping = {
    GET: ' bilgileri alınırken',
    POST: ' yaratılırken',
    PUT: ' güncellenirken',
    DELETE: ' silinirken',
    IMPORT: ' içeriye aktarılırken',
    OTHER: 'Sistemde'
}

const successWordMapping = {
    POST: 'yaratıldı',
    PUT: 'güncellendi',
    DELETE: 'silindi',
    IMPORT: 'içeriye aktarıldı.'
}
export const LOGIN_ERROR = "E-mail adresi ve şifre eşleştirilemedi. Lütfen tekrar deneyiniz."
export const FORGOT_PASSWORD_SUCCESS = "Girdiğiniz bilgiler sistemimizdeki kayıtlarla uyuştuğu takdirde tarafınıza email yoluyla şifre sıfırlama talimatları gönderilecektir."
export const ERROR_TOAST = (type, method) => `${type}${errorWordMapping[method]} bir hata oluştu. Lütfen tekrar deneyiniz.`
export const SUCCESS_TOAST = (type, isNew) => `${type} başarıyla ${isNew ? "yaratıldı" : "güncellendi"}.`
export const SUCCESS_TOAST_METHOD = (type, method) => `${type} başarıyla ${successWordMapping[method]}.`
