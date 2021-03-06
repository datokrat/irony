import * as fs from "fs";
import * as path from "path";

export class FileSystemHelper {

  public static locateFolderOf(
    pathSegemnt: string, relocate: boolean = true, startpath: string = "", searchUp: boolean = true): string {
    if (!searchUp) { throw new Error("Traversing down the path to locate a file is not supported yet!"); }

    startpath = path.posix.resolve(startpath || process.cwd());
    if (startpath.indexOf("/") === 0) { startpath = startpath.substr(1); }

    let pathSegments: string[] = startpath.split("/");

    // HACK: Hardcoded parts of the path!
    if (relocate) {
      pathSegments.push("build");
      pathSegments.push("lib");
    }

    let resolvedPath = "";
    while (resolvedPath === "" && pathSegments.length > 0) {

      let tmp = path.posix.resolve("/", pathSegments.join("/") + "/" + pathSegemnt);
      if (FileSystemHelper.fileOrFolderExists(tmp)) {
        resolvedPath = (FileSystemHelper.isFolder(tmp)) ? tmp : path.posix.parse(tmp).dir;
      } else {
        pathSegments.pop();
      }
    }

    if (resolvedPath === "") {
      throw new Error(
        "Could not locate any file traversing up the path. File [" + pathSegemnt + "] Path [" + startpath + "]");
    }

    return resolvedPath;
  }

  public static locateAndReadFile(
    fileName: string, relocate?: boolean, startpath?: string, searchUp?: boolean): Buffer {
    let folderName = FileSystemHelper.locateFolderOf(fileName, relocate, startpath, searchUp);
    let buffer: Buffer = fs.readFileSync(folderName + "/" + fileName);
    return buffer;
  }

  public static fileOrFolderExists(fileOrFolderName: string): boolean {
    try {
      fs.statSync(fileOrFolderName);
      return true;
    } catch (error) {
      return false;
    }
  }

  public static isFolder(path: string): boolean {
    try {
      let fileStatus: fs.Stats = fs.statSync(path);
      return fileStatus.isDirectory();
    } catch (error) {
      return false;
    }
  }
}
