#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>
#include <linux/hugetlb.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo en linux datos ram");
MODULE_AUTHOR("Aby Palencia");

struct sysinfo info;

static int escribir_a_proc(struct seq_file *archivo, void *v)
{

    long total, fMemory, uMemory, percent;

    si_meminfo(&info);

    total = info.totalram * info.mem_unit;
    fMemory = info.freeram * info.mem_unit;
    uMemory = total - fMemory;
    percent = (uMemory*100)/total;

    seq_printf(archivo, "{");
    seq_printf(archivo, "\"total\": \"");
    seq_printf(archivo, "%li", total);
    seq_printf(archivo, "\",");
    
    seq_printf(archivo, "\"free\": \"");
    seq_printf(archivo, "%li", fMemory);
    seq_printf(archivo, "\",");

    seq_printf(archivo, "\"porcentaje\": \"");
    seq_printf(archivo, "%li", percent);
    seq_printf(archivo, "\",");
    
    seq_printf(archivo, "\"used\": \"");
    seq_printf(archivo, "%li", uMemory);
    seq_printf(archivo, "\"}");
    return 0;
}

static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_a_proc, NULL);
}

// Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones =
    {
        .proc_open = al_abrir,
        .proc_read = seq_read};

// Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    proc_create("ram_201700837", 0, NULL, &operaciones);
    return 0;
}

// Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("ram_201700837", NULL);
}

module_init(_insert);
module_exit(_remove);