import typing

from modulegraph.modulegraph import ModuleGraph

from .. import build_app
from ._types import RecipeInfo


def check(cmd: "build_app.py2app", mf: ModuleGraph) -> typing.Optional[RecipeInfo]:
    m = mf.findNode("pandas")
    if m is None or m.filename is None:
        return None

    includes = ["pandas._libs.tslibs.base"]

    return {"includes": includes}
