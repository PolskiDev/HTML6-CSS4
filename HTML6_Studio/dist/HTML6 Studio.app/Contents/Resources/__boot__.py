def _reset_sys_path() -> None:
    # Clear generic sys.path[0]
    import os
    import sys

    resources = os.environ["RESOURCEPATH"]
    while sys.path[0] == resources:
        del sys.path[0]


_reset_sys_path()


def _site_packages() -> None:
    import os
    import site
    import sys

    paths = []
    prefixes = [sys.prefix]
    if sys.exec_prefix != sys.prefix:
        prefixes.append(sys.exec_prefix)
    for prefix in prefixes:
        paths.append(
            os.path.join(
                prefix, "lib", "python%d.%d" % (sys.version_info[:2]), "site-packages"
            )
        )

    if os.path.join(".framework", "") in os.path.join(sys.prefix, ""):
        home = os.environ.get("HOME")
        if home:
            # Sierra and later
            paths.append(
                os.path.join(
                    home,
                    "Library",
                    "Python",
                    "%d.%d" % (sys.version_info[:2]),
                    "lib",
                    "python",
                    "site-packages",
                )
            )

            # Before Sierra
            paths.append(
                os.path.join(
                    home,
                    "Library",
                    "Python",
                    "%d.%d" % (sys.version_info[:2]),
                    "site-packages",
                )
            )

    # Work around for a misfeature in setuptools: easy_install.pth places
    # site-packages way to early on sys.path and that breaks py2app bundles.
    # NOTE: this is hacks into an undocumented feature of setuptools and
    # might stop to work without warning.
    sys.__egginsert = len(sys.path)  # type: ignore

    for path in paths:
        site.addsitedir(path)


_site_packages()


def _chdir_resource() -> None:
    import os

    os.chdir(os.environ["RESOURCEPATH"])


_chdir_resource()


def _setup_ctypes() -> None:
    import os
    from ctypes.macholib import dyld

    frameworks = os.path.join(os.environ["RESOURCEPATH"], "..", "Frameworks")
    dyld.DEFAULT_FRAMEWORK_FALLBACK.insert(0, frameworks)
    dyld.DEFAULT_LIBRARY_FALLBACK.insert(0, frameworks)


_setup_ctypes()


def _path_inject(paths: "list[str]") -> None:
    import sys

    sys.path[:0] = paths


_path_inject(['/Users/gabrielmargarido/Desktop/HTML6-CSS4/HTML6 Studio'])


import sys

SCRIPT_MAP: "dict[str, str]"
DEFAULT_SCRIPT: str


def _run() -> None:
    global __file__
    import os
    import site  # noqa: F401

    sys.frozen = "macosx_app"  # type: ignore

    argv0 = os.path.basename(os.environ["ARGVZERO"])
    script = SCRIPT_MAP.get(argv0, DEFAULT_SCRIPT)  # noqa: F821

    sys.argv[0] = __file__ = script
    with open(script, "rb") as fp:
        source = fp.read() + b"\n"

    exec(compile(source, script, "exec"), globals(), globals())


DEFAULT_SCRIPT='/Users/gabrielmargarido/Desktop/HTML6-CSS4/HTML6 Studio/main.py'
SCRIPT_MAP={}
try:
    _run()
except KeyboardInterrupt:
    pass
