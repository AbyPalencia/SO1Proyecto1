#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>
#include <linux/hugetlb.h>
#include <linux/sched.h>
#include <linux/mm.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo en linux datos procs");
MODULE_AUTHOR("ABY");

struct task_struct *cpu;
struct task_struct *child;
struct list_head *lstProcess;

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    long rss;
    bool lFather, lfirst, lnext = true, lchilds;

    seq_printf(archivo, "{");
    seq_printf(archivo, "\"procesos\": [");
    for_each_process(cpu)
    {
        lfirst = true;
        if (cpu->mm)
        {
            rss = get_mm_rss(cpu->mm);
            if (lnext)
            {
                seq_printf(archivo, "{");

                seq_printf(archivo, "\"pid\": \"");
                seq_printf(archivo, "%d", cpu->pid);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"nombre\": \"");
                seq_printf(archivo, "%s", cpu->comm);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"usuario\": \"");
                seq_printf(archivo, "%d", __kuid_val(cpu->real_cred->uid));
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"estado\": \"");
                seq_printf(archivo, "%d", cpu->__state);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"ram\": \"");
                seq_printf(archivo, "%ld", rss);
                seq_printf(archivo, "\",");

                lnext = false;
            }
            else
            {
                seq_printf(archivo, ",{");

                seq_printf(archivo, "\"pid\": \"");
                seq_printf(archivo, "%d", cpu->pid);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"nombre\": \"");
                seq_printf(archivo, "%s", cpu->comm);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"usuario\": \"");
                seq_printf(archivo, "%d", __kuid_val(cpu->real_cred->uid));
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"estado\": \"");
                seq_printf(archivo, "%d", cpu->__state);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"ram\": \"");
                seq_printf(archivo, "%ld", rss);
                seq_printf(archivo, "\",");
            }
            lFather = true;
        }
        else
        {
            if (lnext)
            {
                seq_printf(archivo, "{");

                seq_printf(archivo, "\"pid\": \"");
                seq_printf(archivo, "%d", cpu->pid);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"nombre\": \"");
                seq_printf(archivo, "%s", cpu->comm);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"usuario\": \"");
                seq_printf(archivo, "%d", __kuid_val(cpu->real_cred->uid));
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"estado\": \"");
                seq_printf(archivo, "%d", cpu->__state);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"ram\": \"0\",");

                lnext = false;
            }
            else
            {
                seq_printf(archivo, ",{");

                seq_printf(archivo, "\"pid\": \"");
                seq_printf(archivo, "%d", cpu->pid);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"nombre\": \"");
                seq_printf(archivo, "%s", cpu->comm);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"usuario\": \"");
                seq_printf(archivo, "%d", __kuid_val(cpu->real_cred->uid));
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"estado\": \"");
                seq_printf(archivo, "%d", cpu->__state);
                seq_printf(archivo, "\",");

                seq_printf(archivo, "\"ram\": \"0\",");
            }
            lFather = true;
        }

        lchilds = false;
        seq_printf(archivo, "\"childs\": [");

        list_for_each(lstProcess, &(cpu->children))
        {
            child = list_entry(lstProcess, struct task_struct, sibling);
            lchilds = true;

            if (lfirst)
            {

                seq_printf(archivo, "{ \"pid\": \"");
                seq_printf(archivo, "%d", child->pid);
                seq_printf(archivo, "\", \"nombre\": \"");
                seq_printf(archivo, "%s", child->comm);
                seq_printf(archivo, "\", \"estado\": \"");
                seq_printf(archivo, "%d", child->__state);
                seq_printf(archivo, "\" }");
                lfirst = false;
            }
            else
            {
                seq_printf(archivo, ",{ \"pid\": \"");
                seq_printf(archivo, "%d", child->pid);
                seq_printf(archivo, "\", \"nombre\": \"");
                seq_printf(archivo, "%s", child->comm);
                seq_printf(archivo, "\", \"estado\": \"");
                seq_printf(archivo, "%d", child->__state);
                seq_printf(archivo, "\" }");
            }
        }

        if (lFather && lchilds)
        {
            seq_printf(archivo, "]}");
        }
        else if (lFather)
        {
            seq_printf(archivo, "]}");
        }
        else
        {
            seq_printf(archivo, "},");
        }
    }
    seq_printf(archivo, "]}");
    return 0;
}

static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

static struct proc_ops operaciones =
    {
        .proc_open = al_abrir,
        .proc_read = seq_read};

static int _insert(void)
{
    proc_create("cpu_201700837", 0, NULL, &operaciones);
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("cpu_201700837", NULL);
}

module_init(_insert);
module_exit(_remove);